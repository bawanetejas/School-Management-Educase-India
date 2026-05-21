const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool using DATABASE_URL
const pool = mysql.createPool(process.env.DATABASE_URL);

// promisify for async/await
const promisePool = pool.promise();

// test database connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();

        console.log("Database connected successfully");

        connection.release();

        return true;

    } catch (error) {

        console.error(
            "Database connection failed:",
            error.message
        );

        return false;
    }
};

module.exports = {
    pool: promisePool,
    testConnection,
};