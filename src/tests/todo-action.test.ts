import {
	deleteTodoAction,
	deleteTodoDueDateAction,
	updateTodoCompletedAtAction,
	updateTodoCompletionAction,
	updateTodoDescriptionAction,
	updateTodoDueDateAction,
	updateTodoImportanceAction,
	updateTodoTitleAction,
} from '@/actions/todo-action';
import {
	deleteTodo,
	deleteTodoDueDate,
	updateTodoCompletedAt,
	updateTodoCompletion,
	updateTodoDescription,
	updateTodoDueDate,
	updateTodoImportance,
	updateTodoTitle,
} from '../lib/todo';
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

testServerAction(deleteTodoAction, deleteTodo, [1], 'Todo deleted successfully', 'Failed to delete todo');

testServerAction(
	updateTodoTitleAction,
	updateTodoTitle,
	[1, 'New Title'],
	'Updated todo title successfully',
	'Failed to update todo title'
);

testServerAction(
	updateTodoDueDateAction,
	updateTodoDueDate,
	[1, new Date().toDateString()],
	'Updated todo due date successfully',
	'Failed to update todo due date'
);

testServerAction(
	deleteTodoDueDateAction,
	deleteTodoDueDate,
	[1],
	'Deleted todo due date successfully',
	'Failed to delete todo due date'
);

testServerAction(
	updateTodoDescriptionAction,
	updateTodoDescription,
	[1, 'New Description'],
	'Updated todo description successfully',
	'Failed to update todo description'
);

testServerAction(
	updateTodoDescriptionAction,
	updateTodoDescription,
	[1, null],
	'Updated todo description successfully',
	'Failed to update todo description'
);

testServerAction(
	updateTodoCompletedAtAction,
	updateTodoCompletedAt,
	[1, new Date().toDateString()],
	'Updated todo completed at successfully',
	'Failed to update todo completed at'
);
