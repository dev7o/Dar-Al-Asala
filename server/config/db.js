const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    user: process.env.MYSQLUSER || process.env.DB_USER || "root",
    password: process.env.MYSQLPASSWORD || process.env.DB_PASS || "",
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || "perfume_store",
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
});

// تحقق من الاتصال عند البدء
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ فشل الاتصال بقاعدة البيانات:", err.message);
        return;
    }
    console.log("✅ تم الاتصال بقاعدة البيانات MySQL بنجاح");
    connection.release();
});

module.exports = pool.promise();
