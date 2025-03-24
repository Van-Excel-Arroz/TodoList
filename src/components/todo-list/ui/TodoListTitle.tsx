'use client';

import { updateTodolistAction } from '@/actions/todolist-action';
import TodoListsSidebarToggle from '@/components/sidebar/ui/TodoListsSidebarToggle';
import Button from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import { TodoList } from '@/utils/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TodoListMenu from './TodoListMenu';

interface TodoListTiltleProps {
	currentTodoList: TodoList;
}

export default function TodoListTitle({ currentTodoList }: TodoListTiltleProps) {
	const { updateTodolistTitle } = useTodoListsStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>();

	const onSubmit = async (data: { title: string }) => {
		if (!data.title?.trim()) return;
		if (currentTodoList.title !== data.title) {
			await updateTodolistAction(currentTodoList.id, data.title);
			updateTodolistTitle(currentTodoList.id, data.title);
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
		<div className="flex items-center gap-2 relative">
			<TodoListsSidebarToggle />
			{isEditing ? (
				<div onBlur={handleInputBlur} tabIndex={-1}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							{...register('title')}
							defaultValue={currentTodoList.title}
							autoFocus
							className="p-1 focus:outline outline-slate-600 rounded-md focus text-lg"
						/>
					</form>
				</div>
			) : (
				// <Button ariaLabel="Edit Todolist Title" onClick={() => setIsEditing(true)}>
				<p className="text-lg font-bold text-gray-700 cursor-text">{currentTodoList.title}</p>
				// </Button>
			)}
			<TodoListMenu todolistId={currentTodoList.id} setToEditing={() => setIsEditing(true)} />
		</div>
	);
}
