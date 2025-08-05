'use server';

import { authenticateUser, storeUser } from '@/lib/user';
import { ActionState } from '@/utils/types';

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

export async function authenticateUserAction(email: string, password: string): Promise<ActionState<number | null>> {
	const result = await authenticateUser(email, password);
	if (result) {
		return {
			message: 'User authenticated successfully',
			success: true,
			data: result,
		};
	} else {
		console.error('Failed to authenticate the user');
		return {
			message: 'Failed to authenticate the user',
			success: false,
			data: null,
		};
	}
}
