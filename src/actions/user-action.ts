'use server';

import { authenticateUser, storeUser } from '@/lib/user';
import { ActionState } from '@/utils/types';
import { cookies } from 'next/headers';

export async function createUserAction(
	email: string,
	username: string,
	password: string
): Promise<ActionState<number | null>> {
	const result = await storeUser(email, username, password);
	if (result) {
		return {
			message: 'User created successfully',
			success: true,
			data: result,
		};
	} else {
		console.error('Failed to create the user');
		return {
			message: 'Failed to create the user',
			success: false,
			data: null,
		};
	}
}

export async function authenticateUserAction(email: string, password: string): Promise<ActionState<void>> {
	try {
		const userId = await authenticateUser(email, password);
		if (userId) {
			const cookieStore = await cookies();

			cookieStore.set('session_token', userId.toString(), {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7, // 1 week,
				path: '/',
				sameSite: 'lax',
			});
			return {
				message: 'Logged in successfully',
				success: true,
			};
		} else {
			return {
				message: 'Invalid email or password',
				success: false,
			};
		}
	} catch (error) {
		console.error('Error authenticating user', error);
		return {
			message: 'Error authenticating user',
			success: false,
		};
	}
}

export async function logoutUserAction() {
	const cookieStore = await cookies();
	cookieStore.delete('session_token');
}
