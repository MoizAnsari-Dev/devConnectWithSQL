import { Pool } from "pg";

const pool = new Pool({
    ConnectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});


module.exports = pool;