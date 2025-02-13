'use client';

import { memo, useEffect, useState } from 'react';
import { Category, TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';
import { useForm } from 'react-hook-form';
import { updateTodolistAction } from '@/actions/todolist-action';

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
	const [isEditing, setIsEditing] = useState(false);
	const { updateTodolistTitle } = useTodoListsStore();
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>();

	useEffect(() => {
		setCategories(categories);
	}, [categories, setCategories]);

	const onSubmit = async (data: { title: string }) => {
		if (!data.title?.trim()) return;
		if (currentTodolist.title !== data.title) {
			await updateTodolistAction(currentTodolist.id, data.title);
			updateTodolistTitle(currentTodolist.id, data.title);
		}
		setIsEditing(false);
		reset();
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsEditing(false);
		}
	};

	return (
		<div className="z-50 px-6 bg-white border-b border-slate-300 ">
			<div className="flex justify-between items-center py-2">
				<div className="flex items-center gap-2 relative">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					{isEditing ? (
						<div onBlur={handleInputBlur} tabIndex={-1}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<input
									type="text"
									defaultValue={currentTodolist.title}
									autoFocus
									className="p-1 focus:outline outline-slate-600 rounded-md focus text-lg"
								/>
							</form>
						</div>
					) : (
						<Button ariaLabel="Edit Todolist Title" onClick={() => setIsEditing(true)}>
							<p className="text-lg font-bold text-black">{currentTodolist.title}</p>
						</Button>
					)}
				</div>
				<Button ariaLabel="Settings">
					<Settings />
				</Button>
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
