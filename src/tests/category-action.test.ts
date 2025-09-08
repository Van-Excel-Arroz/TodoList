import { removeCategoryFromTodoAction } from '@/actions/category-action';
import { testServerAction } from './test-server-action';
import { removeCategoryFromTodo, updateCategoryColor } from '../lib/category';
import { updateCategoryColorAction } from '../actions/category-action';

jest.mock(`../lib/category`);

testServerAction(
	removeCategoryFromTodoAction,
	removeCategoryFromTodo,
	[1, 2],
	'Category removed from todo successfully',
	'Failed to remove category from todo'
);

testServerAction(
	updateCategoryColorAction,
	updateCategoryColor,
	[1, 2, '#000000'],
	'Category color updated successfully',
	'Failed to update category color'
);
