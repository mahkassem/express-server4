import { Pool } from 'pg';
import env from '../utils/helpers/env.helper';

const db: Pool = new Pool({
    user: env('DB_USER'),
    host: env('DB_HOST'),
    database: env('DB_NAME'),
    password: env('DB_PASS'),
    port: parseInt(env('DB_PORT')),
});

export default db;