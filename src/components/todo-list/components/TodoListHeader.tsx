'use client';

import { memo, useEffect } from 'react';
import { Category, TodoList } from '@/utils/types';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Grid2X2, ListTodo } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';
import TodoListTitle from '../ui/TodoListTitle';
import TodoSearch from '../ui/TodoSearch';

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
		<div className="z-50 px-6 bg-white border-b border-slate-300 ">
			<div className="flex justify-between items-center py-2">
				<div className="flex items-center gap-1">
					<TodoListTitle currentTodoList={currentTodolist} />

					<Button ariaLabel="Grid Layout">
						<Grid2X2 />
					</Button>
					<Button ariaLabel="List Layout">
						<ListTodo />
					</Button>
				</div>
				<div className="flex items-center justify-between gap-2">
					<TodoSearch />
					<div className="flex items-center gap-4 pt-2">
						<TodoSort />
						<TodoFilter />
					</div>
				</div>
			</div>
			<TodoForm todolistId={initialTodolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
