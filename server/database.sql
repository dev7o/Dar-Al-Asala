-- =========================================
-- قاعدة بيانات: perfume_store
-- =========================================

CREATE DATABASE IF NOT EXISTS perfume_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE perfume_store;

-- ─── جدول المنتجات ───────────────────────
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255)                        NOT NULL,
  description  TEXT,
  long_description TEXT,
  price        DECIMAL(10, 2)                      NOT NULL DEFAULT 0,
  discount_price DECIMAL(10, 2)                      DEFAULT NULL,
  category     ENUM('men', 'women', 'unisex')      NOT NULL DEFAULT 'unisex',
  rating       TINYINT UNSIGNED                    NOT NULL DEFAULT 5,
  image_url    VARCHAR(1000),
  best_seller  TINYINT(1)                          NOT NULL DEFAULT 0,
  notes        JSON,
  size         VARCHAR(100)                        DEFAULT '100 مل',
  created_at   TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── بيانات أولية (افتراضية) ─────────────
INSERT INTO products (name, description, long_description, price, discount_price, category, rating, image_url, best_seller, notes, size) VALUES
('عود الملوك',    'عطر ملكي فاخر بمزيج من العود الكمبودي والمسك الأبيض',    'عطر عود الملوك هو تحفة عطرية فاخرة تجمع بين أجود أنواع العود الكمبودي والمسك الأبيض النقي.',    450, 399, 'men',    5, NULL, 1, '["العود الكمبودي","المسك الأبيض","العنبر","الزعفران"]', '100 مل'),
('زهرة الليل',   'عطر أنثوي ساحر بنفحات الورد والياسمين الليلي',              'زهرة الليل عطر يحتفي بجمال الأنوثة وغموض الليل.',                                                     380, NULL, 'women', 5, NULL, 1, '["الورد التركي","الياسمين","الفانيليا","العنبر"]',    '75 مل'),
('أسرار الشرق',  'عطر شرقي غامض للجنسين بمكونات نادرة',                      'أسرار الشرق عطر يجسد روعة التراث العطري الشرقي.',                                                      520, 450, 'unisex', 4, NULL, 0, '["البخور الصومالي","العود الهندي","الورد","المسك"]', '100 مل'),
('بخور العود',   'عطر كلاسيكي فاخر مستوحى من تقاليد البخور العربي',           'بخور العود هو رحلة عطرية إلى قلب التقاليد العربية الأصيلة.',                                           590, 'men',    5, NULL, 1, '["العود","البخور","العنبر الرمادي","الصندل"]',        '100 مل'),
('مسك الغزال',   'عطر ناعم وأنيق بنفحات المسك الطبيعي الفاخر',                'مسك الغزال عطر يتميز بنقاء المسك الطبيعي الممزوج بالورد الطائفي.',                                    350, 'women', 4, NULL, 0, '["المسك الطبيعي","الورد الطائفي","العنبر","الصندل"]','75 مل'),
('عنبر الصحراء', 'عطر دافئ وجريء مستوحى من رمال الصحراء الذهبية',            'عنبر الصحراء عطر يأخذك في رحلة إلى قلب الصحراء العربية.',                                             420, 'unisex', 5, NULL, 1, '["العنبر","التوابل الشرقية","خشب الأرز","الباتشولي"]','100 مل');
