import { Pool } from 'pg';

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: parseInt(process.env.PGPORT || '5432'),
});

export async function query(text: string, params?: any[]) {
	return pool.query(text, params);
}
