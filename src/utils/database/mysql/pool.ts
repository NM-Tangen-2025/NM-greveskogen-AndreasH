import mysql from 'mysql2/promise';
/**
 * Allows you to connect to the mysql pool.
 * **Example:**
 * ```typescript
 * import pool from '/path/to/pool';
 * // Then you can use the pool to query the database like this
 * const result = await pool.query('SELECT * FROM users');
 * ```
 */

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;