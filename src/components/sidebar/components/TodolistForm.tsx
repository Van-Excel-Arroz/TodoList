'use client';

import { useForm } from 'react-hook-form';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';
import TodoListTitleInput from '../ui/TodoListTitleInput';
import { Button } from '@/components/ui-shared/Button';
import { Plus } from 'lucide-react';

export default function TodolistForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

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
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				{errors.title?.message && <p>{errors.title.message as string}</p>}
				<div className="flex flex-row justify-center ">
					<TodoListTitleInput register={register} />
					<Button type="submit" ariaLabel="Submit new list">
						<Plus size={20} />
					</Button>
				</div>
			</form>
		</>
	);
}
