const db = require("./config/db");

const products = [
    {
        name: 'عود الملوك',
        description: 'عطر ملكي فاخر بمزيج من العود الكمبودي والمسك الأبيض',
        longDescription: 'عطر عود الملوك هو تحفة عطرية فاخرة تجمع بين أجود أنواع العود الكمبودي والمسك الأبيض النقي.',
        price: 450,
        category: 'men',
        rating: 5,
        bestSeller: 1,
        notes: JSON.stringify(["العود الكمبودي", "المسك الأبيض", "العنبر", "الزعفران"]),
        size: '100 مل'
    },
    {
        name: 'زهرة الليل',
        description: 'عطر أنثوي ساحر بنفحات الورد والياسمين الليلي',
        longDescription: 'زهرة الليل عطر يحتفي بجمال الأنوثة وغموض الليل.',
        price: 380,
        category: 'women',
        rating: 5,
        bestSeller: 1,
        notes: JSON.stringify(["الورد التركي", "الياسمين", "الفانيليا", "العنبر"]),
        size: '75 مل'
    },
    {
        name: 'أسرار الشرق',
        description: 'عطر شرقي غامض للجنسين بمكونات نادرة',
        longDescription: 'أسرار الشرق عطر يجسد روعة التراث العطري الشرقي.',
        price: 520,
        category: 'unisex',
        rating: 4,
        bestSeller: 0,
        notes: JSON.stringify(["البخور الصومالي", "العود الهندي", "الورد", "المسك"]),
        size: '100 مل'
    },
    {
        name: 'بخور العود',
        description: 'عطر كلاسيكي فاخر مستوحى من تقاليد البخور العربي',
        longDescription: 'بخور العود هو رحلة عطرية إلى قلب التقاليد العربية الأصيلة.',
        price: 590,
        category: 'men',
        rating: 5,
        bestSeller: 1,
        notes: JSON.stringify(["العود", "البخور", "العنبر الرمادي", "الصندل"]),
        size: '100 مل'
    },
    {
        name: 'مسك الغزال',
        description: 'عطر ناعم وأنيق بنفحات المسك الطبيعي الفاخر',
        longDescription: 'مسك الغزال عطر يتميز بنقاء المسك الطبيعي الممزوج بالورد الطائفي.',
        price: 350,
        category: 'women',
        rating: 4,
        bestSeller: 0,
        notes: JSON.stringify(["المسك الطبيعي", "الورد الطائفي", "العنبر", "الصندل"]),
        size: '75 مل'
    },
    {
        name: 'عنبر الصحراء',
        description: 'عطر دافئ وجريء مستوحى من رمال الصحراء الذهبية',
        longDescription: 'عنبر الصحراء عطر يأخذك في رحلة إلى قلب الصحراء العربية.',
        price: 420,
        category: 'unisex',
        rating: 5,
        bestSeller: 1,
        notes: JSON.stringify(["العنبر", "التوابل الشرقية", "خشب الأرز", "الباتشولي"]),
        size: '100 مل'
    }
];

async function seed() {
    try {
        console.log("جارِ مسح البيانات المشوهة...");
        await db.query("TRUNCATE TABLE products");

        console.log("جارِ إدخال البيانات الصحيحة...");
        for (const p of products) {
            await db.query(
                `INSERT INTO products (name, description, long_description, price, category, rating, best_seller, notes, size)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [p.name, p.description, p.longDescription, p.price, p.category, p.rating, p.bestSeller, p.notes, p.size]
            );
        }
        console.log("✅ تم إدخال البيانات بنجاح!");
    } catch (err) {
        console.error("❌ خطأ:", err);
    } process.exit(0);
}

seed();
