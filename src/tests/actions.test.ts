import { updateTodoCompletionAction } from '@/actions/todo-action';
import { updateTodoCompletion } from '../lib/todo';

jest.mock(`../lib/todo`);

function testServerAction(
	serverAction: (...args: any) => any,
	databaseFunction: (...args: any) => any,
	testArgs: any,
	successMessage: string,
	failureMessage: string
) {
	const mockDatabaseFunction = databaseFunction as jest.MockedFunction<typeof databaseFunction>;

	describe('serverAction', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return sucess when database update succeeds', async () => {
			mockDatabaseFunction.mockResolvedValue(true);

			const result = await serverAction(...testArgs);

			expect(result).toEqual({
				success: true,
				message: successMessage,
			});

			expect(mockDatabaseFunction).toHaveBeenCalledWith(...testArgs);
		});

		it('should return failure when database update fails', async () => {
			mockDatabaseFunction.mockResolvedValue(false);

			const result = await serverAction(...testArgs);

			expect(result).toEqual({
				success: false,
				message: failureMessage,
			});

			expect(mockDatabaseFunction).toHaveBeenCalledWith(...testArgs);
		});
	});
}

testServerAction(
	updateTodoCompletionAction,
	updateTodoCompletion,
	[1, true],
	'Todo completion updated successfully',
	'Failed to update todo completion'
);
