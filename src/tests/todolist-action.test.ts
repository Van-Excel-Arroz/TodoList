import { deleteTodolistAction } from '@/actions/todolist-action';
import { testServerAction } from './test-server-action';
import { deleteTodolist } from '../lib/todolist';

jest.mock(`../lib/todolist`);

testServerAction(
	deleteTodolistAction,
	deleteTodolist,
	[1],
	'Todo list deleted successfully',
	'Failed to delete the todo list'
);
