import { User } from '@/utils/types';
import { query } from './db';

export async function storeUser({ email, username, password }: User) {
	try {
		const result = await query(
			`
			INSER INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id
			`,
			[email, username, password]
		);
		return result.rows[0].id;
	} catch (error) {
		console.log('Error inserting user in the database', error);
	}
}
