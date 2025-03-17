'use client';

import { updateTodolistAction } from '@/actions/todolist-action';
import TodoListsSidebarToggle from '@/components/sidebar/ui/TodoListsSidebarToggle';
import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useTodoListsStore from '@/context/TodoListsContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { TodoList } from '@/utils/types';
import { Ellipsis, Settings } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoListTiltleProps {
	currentTodoList: TodoList;
}

export default function TodoListTitle({ currentTodoList }: TodoListTiltleProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { updateTodolistTitle } = useTodoListsStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
			{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
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
				<Button ariaLabel="Edit Todolist Title" onClick={() => setIsEditing(true)}>
					<p className="text-xl font-bold text-black cursor-text">{currentTodoList.title}</p>
				</Button>
			)}
			<Button ariaLabel="Settings" onClick={() => setIsMenuOpen(prev => !prev)}>
				<Ellipsis />
			</Button>
			<Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} width="w-44" posX="left-20">
				<MenuItem>Delete</MenuItem>
			</Menu>
		</div>
	);
}
