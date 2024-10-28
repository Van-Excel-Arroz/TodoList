import { query } from './db';

const user_id = 1;

export async function getUserFullName() {
	const result = await query(`SELECT first_name || ' ' || last_name AS full_name FROM users WHERE id = $1`, [user_id]);
	return result.rows[0];
}
