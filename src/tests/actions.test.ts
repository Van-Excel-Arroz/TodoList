import { updateTodoCompletionAction, updateTodoImportanceAction } from '@/actions/todo-action';
import { updateTodoCompletion, updateTodoImportance } from '../lib/todo';
import { testServerAction } from './test-server-action';

jest.mock(`../lib/todo`);

testServerAction(
	updateTodoCompletionAction,
	updateTodoCompletion,
	[1, true],
	'Todo completion updated successfully',
	'Failed to update todo completion'
);

testServerAction(
	updateTodoImportanceAction,
	updateTodoImportance,
	[1, true],
	'Todo importance updated successfully',
	'Failed to update todo importance'
);
