require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ── إنشاء مجلد uploads إذا لم يكن موجوداً ──────────────
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── Middlewares ──────────────────────────────────────────
app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ── تقديم الصور ──────────────────────────────────────────
app.use("/uploads", express.static(uploadsDir));

// ── Routes ───────────────────────────────────────────────
app.use("/api/products", require("./routes/products"));

// ── تقديم واجهة المستخدم في الإنتاج ───────────────
const frontendDist = path.join(__dirname, "../dist");
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get("*", (req, res, next) => {
        if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
            res.sendFile(path.join(frontendDist, "index.html"));
        } else {
            next();
        }
    });
}

// ── Health check ─────────────────────────────────────────
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "دار الأصالة API يعمل بشكل طبيعي 🌟", time: new Date().toISOString() });
});

// ── Route غير موجود ──────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: "المسار غير موجود" });
});

// ── معالج الأخطاء العام ──────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error("🔴 خطأ:", err.message);
    res.status(500).json({ error: err.message || "خطأ داخلي في الخادم" });
});

// ── تشغيل الخادم ─────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
    console.log(`
╔══════════════════════════════════════╗
║   🌟 دار الأصالة — خادم API           ║
║   http://localhost:${PORT}              ║
╚══════════════════════════════════════╝
  `);
});
