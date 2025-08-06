import { cookies } from 'next/headers';
import { query } from './db';
import bcrypt from 'bcryptjs';
import { cache } from 'react';
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

export async function authenticateUser(email: string, password: string): Promise<number | null> {
	try {
		const result = await query(
			`
			SELECT id, password FROM users WHERE email = $1
			`,
			[email]
		);

		const user = result.rows[0];
		if (!user) return null;

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			return user.id;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error authenticating user in the database', error);
		return null;
	}
}

export const getAuthenticatedUserId = cache(async (): Promise<number | null> => {
	try {
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session_token')?.value;

		if (!sessionToken) {
			return null;
		}

		const userId = parseInt(sessionToken, 10);

		if (isNaN(userId)) {
			console.warn('Invalid session token:', sessionToken);
			cookieStore.delete('session_token');
			return null;
		}

		const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
		if (userCheck.rows.length === 0) {
			console.warn('User not found in the database:', userId);
			cookieStore.delete('session_token');
			return null;
		}

		return userId;
	} catch (error) {
		console.error('Error getting authenticated user ID:', error);
		return null;
	}
});
