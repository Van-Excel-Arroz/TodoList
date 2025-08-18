import { updateTodoCompletionAction } from '../actions/todo-action';
import { updateTodoCompletion } from '../lib/todo';

jest.mock('../lib/todo');

const mockUpdateTodoCompletion = updateTodoCompletion as jest.MockedFunction<typeof updateTodoCompletion>;

describe('updateTodoCompletionAction', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return sucess when database update succeeds', async () => {
		mockUpdateTodoCompletion.mockResolvedValue(true);

		const result = await updateTodoCompletionAction(1, true);

		expect(result).toEqual({
			success: true,
			message: 'Todo completion updated successfully',
		});

		expect(mockUpdateTodoCompletion).toHaveBeenCalledWith(1, true);
	});

	it('should return failure when database update fails', async () => {
		mockUpdateTodoCompletion.mockResolvedValue(false);

		const result = await updateTodoCompletionAction(1, false);

		expect(result).toEqual({
			success: false,
			message: 'Failed to update todo completion',
		});

		expect(mockUpdateTodoCompletion).toHaveBeenCalledWith(1, false);
	});
});
