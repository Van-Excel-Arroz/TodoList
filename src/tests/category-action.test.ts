import { removeCategoryFromTodoAction } from '@/actions/category-action';
import { testServerAction } from './test-server-action';
import { removeCategoryFromTodo } from '../lib/category';

jest.mock(`../lib/category`);

testServerAction(
	removeCategoryFromTodoAction,
	removeCategoryFromTodo,
	[1, 2],
	'Category removed from todo successfully',
	'Failed to remove category from todo'
);
