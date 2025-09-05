import { deleteTodolistAction, updateTodolistAction } from '@/actions/todolist-action';
import { testServerAction } from './test-server-action';
import { deleteTodolist, updateTodolist } from '../lib/todolist';

jest.mock(`../lib/todolist`);

testServerAction(
	deleteTodolistAction,
	deleteTodolist,
	[1],
	'Todo list deleted successfully',
	'Failed to delete the todo list'
);

testServerAction(
	updateTodolistAction,
	updateTodolist,
	[1, 'New Title'],
	'Todo list updated successfully',
	'Failed to update the todo list'
);
