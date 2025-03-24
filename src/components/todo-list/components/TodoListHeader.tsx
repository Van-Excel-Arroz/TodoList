'use client';

import { memo, useEffect } from 'react';
import { Category, TodoList } from '@/utils/types';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';
import TodoListTitle from '../ui/TodoListTitle';
import TodoSearch from '../ui/TodoSearch';
import LayoutButtons from '@/components/ui-shared/LayoutButtons';
import { Settings } from 'lucide-react';
import Button from '@/components/ui-shared/Button';

interface TodoListHeaderProps {
	initialTodolist: TodoList;
	categories: Category[];
}

function TodoListHeader({ initialTodolist, categories }: TodoListHeaderProps) {
	const { getTodoListById } = useTodoListsStore();
	const { setCategories } = useCategoriesStore();
	const todolistFromStore = getTodoListById(initialTodolist.id);
	const currentTodolist = todolistFromStore || initialTodolist;

	useEffect(() => {
		setCategories(categories);
	}, [categories, setCategories]);

	return (
		<div className="z-50 px-6 bg-white border-b border-slate-300">
			<div className="flex justify-between items-center py-3">
				<div className="flex items-center gap-1">
					<TodoListTitle currentTodoList={currentTodolist} />
					<LayoutButtons param="id" />
				</div>
				<div className="flex items-center gap-4">
					<TodoSearch />
					<TodoSort />
					<TodoFilter />
					<Button ariaLabel="TodoList Setting">
						<Settings size={22} />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default memo(TodoListHeader);
