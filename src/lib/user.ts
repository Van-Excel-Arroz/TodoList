import { query } from './db';

export async function storeUser(email: string, username: string, password: string) {
	try {
		const result = await query(
			`
			INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id
			`,
			[email, username, password]
		);
		return result.rows[0].id;
	} catch (error) {
		console.log('Error inserting user in the database', error);
	}
}
