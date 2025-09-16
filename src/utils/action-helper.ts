'use server';

import { ActionState } from './types';

export function createActionResponse<T>(
	success: boolean,
	successMessage: string,
	failureMessage: string,
	data?: T
): ActionState<T | undefined> {
	if (success) {
		return {
			success: true,
			message: successMessage,
			data,
		};
	} else {
		return {
			success: false,
			message: failureMessage,
		};
	}
}
