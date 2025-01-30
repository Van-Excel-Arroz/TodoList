'use client';

import { useForm } from 'react-hook-form';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';
import TodoListTitleInput from './TodoListTitleInput';
import { Button } from '@/components/ui-shared/Button';
import { Plus } from 'lucide-react';

export default function TodolistForm() {
	const { register, handleSubmit, reset } = useForm();

	const { addTodolist } = useTodoListsStore();

	async function onSubmit(data: any) {
		if (!data.title?.trim()) return;
		const todolistId = await createTodolist(data.title);

		if (!todolistId) return;

		addTodolist({ id: todolistId, title: data.title });
		reset();
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-2 mb-4 flex flex-col">
				<div className="flex items-center gap-2">
					<TodoListTitleInput register={register} />
					<Button
						type="submit"
						ariaLabel="Submit new list"
						darkMode={true}
						className="h-10 w-12 flex items-center justify-center"
					>
						<Plus size={20} />
					</Button>
				</div>
			</form>
		</>
	);
}
