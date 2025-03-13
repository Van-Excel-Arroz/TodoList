'use client';

import { memo, useEffect } from 'react';
import { Category, TodoList } from '@/utils/types';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Grid2X2, ListTodo, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';
import TodoListTitle from '../ui/TodoListTitle';

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
				<TodoListTitle currentTodoList={currentTodolist} />
				<div className="flex items-center gap-2">
					<Button ariaLabel="Grid Layout">
						<Grid2X2 />
					</Button>
					<Button ariaLabel="List Layout">
						<ListTodo />
					</Button>
					<Button ariaLabel="Settings">
						<Settings />
					</Button>
				</div>
			</div>
			<TodoForm todolistId={initialTodolist.id} />
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 w-60 pt-2">
					<Button ariaLabel="Search">
						<Search size={20} />
					</Button>
					<input
						type="text"
						className="px-2 py-1 text-md border-b-2 focus:outline-none focus:border-slate-500 hover:border-slate-400 border-slate-300"
						placeholder="Search tasks..."
					/>
				</div>
				<div className="flex items-center gap-4 pt-2">
					<TodoSort />
					<TodoFilter />
				</div>
			</div>
		</div>
	);
}

export default memo(TodoListHeader);
