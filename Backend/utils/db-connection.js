const db = require('mysql2/promise');

let pool;

function getPool() {
    if (!pool) {
        pool = db.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            namedPlaceholders: true
        })
    }
    return pool;
};

async function execute(query, params = []) {
    const dbPool = getPool();
    const [data, value] = await dbPool.execute(query, params);
    return data;
}

module.exports = { execute, getPool };