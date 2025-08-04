import { query } from './db';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

export async function storeUser(email: string, username: string, password: string) {
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const result = await query(
			`
			INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id
			`,
			[email, username, hashedPassword]
		);
		return result.rows[0].id;
	} catch (error) {
		console.log('Error inserting user in the database', error);
	}
}
