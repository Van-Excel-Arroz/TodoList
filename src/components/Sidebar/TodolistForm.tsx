'use client';

import { memo } from 'react';
import { createTodolist } from '../../actions/todolist-action';
import { useForm } from 'react-hook-form';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistFormProps {
	onAdd: (todolist: Todolist) => void;
}

const TodolistForm = memo(function ({ onAdd }: TodolistFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: any) {
		try {
			const todolistId = await createTodolist(data.title);
			onAdd({ id: todolistId, title: data.title });
			reset();
		} catch (error) {
			console.error('Failed to create todolist');
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				<div className="flex flex-row justify-center ">
					<input
						{...register('title', {
							required: true,
							maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
						})}
						type="text"
						placeholder="New list"
						className="border rounded p-2 w-full shadow-2xl focus:outline-none"
					/>
					<button type="submit" className="border rounded shadow-xl py-2 px-4 text-lg">
						+
					</button>
				</div>
				{errors.title?.message && typeof errors.title.message === 'string' && <p>{errors.title.message}</p>}
			</form>
		</>
	);
});

export default TodolistForm;
