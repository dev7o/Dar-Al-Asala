const express = require("express");
const router = express.Router();
const db = require("../config/db");
const upload = require("../middleware/upload");
const path = require("path");
const fs = require("fs");

// ── مساعد: بناء URL الصورة ──────────────────────────────
const buildImageUrl = (req, filename) =>
    filename ? `${req.protocol}://${req.get("host")}/uploads/${filename}` : null;

// ── مساعد: تحويل صف DB إلى كائن JS ────────────────────
const rowToProduct = (row, req) => ({
    id: row.id,
    name: row.name,
    description: row.description || "",
    longDescription: row.long_description || "",
    price: parseFloat(row.price),
    discountPrice: row.discount_price ? parseFloat(row.discount_price) : null,
    category: row.category,
    rating: row.rating,
    image: row.image_url
        ? row.image_url.startsWith("http")
            ? row.image_url
            : buildImageUrl(req, row.image_url)
        : "",
    bestSeller: Boolean(row.best_seller),
    notes: (() => {
        try {
            return typeof row.notes === "string" ? JSON.parse(row.notes) : row.notes || [];
        } catch {
            return [];
        }
    })(),
    size: row.size || "100 مل",
});

// ────────────────────────────────────────────────────────
// GET /api/products — جلب كل المنتجات
// ────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM products ORDER BY created_at DESC"
        );
        res.json(rows.map((r) => rowToProduct(r, req)));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "خطأ في جلب المنتجات" });
    }
});

// ────────────────────────────────────────────────────────
// GET /api/products/:id — جلب منتج واحد
// ────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
            req.params.id,
        ]);
        if (!rows.length) return res.status(404).json({ error: "المنتج غير موجود" });
        res.json(rowToProduct(rows[0], req));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "خطأ في جلب المنتج" });
    }
});

// ────────────────────────────────────────────────────────
// POST /api/products — إضافة منتج جديد
// ────────────────────────────────────────────────────────
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, description, longDescription, price, discountPrice, category, rating, bestSeller, notes, size } =
            req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "اسم المنتج والسعر مطلوبان" });
        }

        const imageUrl = req.file ? req.file.filename : null;
        let parsedNotes = [];
        try { parsedNotes = typeof notes === "string" ? JSON.parse(notes) : notes || []; } catch { }

        const [result] = await db.query(
            `INSERT INTO products
        (name, description, long_description, price, discount_price, category, rating, image_url, best_seller, notes, size)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                description || "",
                longDescription || "",
                parseFloat(price),
                discountPrice && discountPrice !== "null" ? parseFloat(discountPrice) : null,
                category || "unisex",
                parseInt(rating) || 5,
                imageUrl,
                bestSeller === "true" || bestSeller === true ? 1 : 0,
                JSON.stringify(parsedNotes),
                size || "100 مل",
            ]
        );

        const [newRows] = await db.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
        res.status(201).json(rowToProduct(newRows[0], req));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "خطأ في إضافة المنتج" });
    }
});

// ────────────────────────────────────────────────────────
// PUT /api/products/:id — تعديل منتج
// ────────────────────────────────────────────────────────
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const [existing] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (!existing.length) return res.status(404).json({ error: "المنتج غير موجود" });

        const { name, description, longDescription, price, discountPrice, category, rating, bestSeller, notes, size } =
            req.body;

        let imageUrl = existing[0].image_url;

        // إذا رُفعت صورة جديدة، احذف القديمة
        if (req.file) {
            if (imageUrl && !imageUrl.startsWith("http")) {
                const oldPath = path.join(__dirname, "..", "uploads", imageUrl);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            imageUrl = req.file.filename;
        }

        let parsedNotes = [];
        try { parsedNotes = typeof notes === "string" ? JSON.parse(notes) : notes || []; } catch { }

        await db.query(
            `UPDATE products SET
        name = ?, description = ?, long_description = ?, price = ?, discount_price = ?,
        category = ?, rating = ?, image_url = ?, best_seller = ?, notes = ?, size = ?
       WHERE id = ?`,
            [
                name || existing[0].name,
                description || existing[0].description,
                longDescription || existing[0].long_description,
                parseFloat(price) || existing[0].price,
                discountPrice === "null" || discountPrice === "" ? null : (discountPrice ? parseFloat(discountPrice) : existing[0].discount_price),
                category || existing[0].category,
                parseInt(rating) || existing[0].rating,
                imageUrl,
                bestSeller === "true" || bestSeller === true ? 1 : 0,
                JSON.stringify(parsedNotes),
                size || existing[0].size,
                id,
            ]
        );

        const [updated] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        res.json(rowToProduct(updated[0], req));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "خطأ في تعديل المنتج" });
    }
});

// ────────────────────────────────────────────────────────
// DELETE /api/products/:id — حذف منتج
// ────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: "المنتج غير موجود" });

        // حذف ملف الصورة إن وُجد
        const imageUrl = rows[0].image_url;
        if (imageUrl && !imageUrl.startsWith("http")) {
            const imgPath = path.join(__dirname, "..", "uploads", imageUrl);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
        res.json({ message: "تم حذف المنتج بنجاح", id: parseInt(req.params.id) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "خطأ في حذف المنتج" });
    }
});

module.exports = router;
