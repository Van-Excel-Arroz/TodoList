import { updateTodoCompletionAction } from '@/actions/todo-action';
import { updateTodoCompletion } from '../lib/todo';
import { testServerAction } from './test-server-action';

jest.mock(`../lib/todo`);

testServerAction(
	updateTodoCompletionAction,
	updateTodoCompletion,
	[1, true],
	'Todo completion updated successfully',
	'Failed to update todo completion'
);
