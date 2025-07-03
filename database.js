import {Pool} from 'pg';
import { DataBase_URL } from './config';

const pool = new Pool({
    connectionString: DataBase_URL,
    ssl: {rejectUnauthorized: false}
});

export {
    pool
}