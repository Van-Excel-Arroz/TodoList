'use client';

import { memo } from 'react';
import { Category, TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';

interface TodoListHeaderProps {
	initialTodolist: TodoList;
	categories: Category[];
}

function TodoListHeader({ initialTodolist, categories }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { getTodoListById } = useTodoListsStore();
	const { setCategories } = useCategoriesStore();
	const todolistFromStore = getTodoListById(initialTodolist.id);
	const currentTodolist = todolistFromStore || initialTodolist;

	return (
		<div className="sticky top-0 bg-slate-100 z-50 px-6 pb-5">
			<div className="flex justify-between items-center py-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold">{currentTodolist.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button ariaLabel="Search">
						<Search />
					</Button>
					<TodoSort todolistId={initialTodolist.id} />
					<TodoFilter initialCategories={categories} />
				</div>
			</div>
			<TodoForm todolistId={initialTodolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
