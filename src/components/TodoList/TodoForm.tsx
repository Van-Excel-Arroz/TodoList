'use client';

import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todolist-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { memo } from 'react';

interface TodoFormProps {
	todolistId: number;
}

function TodoForm({ todolistId }: TodoFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: any) {
		if (!data.todo.trim()) return;

		if (!data.time && data.date) {
			data.time = '23:59:59';
		}

		if (!data.date && data.time) {
			const now = new Date();
			data.date = now.toISOString().split('T')[0];
		}

		const todoTask = extractTitle(data.todo);
		const categories = extractCategory(data.todo);
		let timestamp: string | null = data.date + ' ' + data.time;

		if (timestamp.trim() === '') timestamp = null;

		if (todoTask.trim() === '') {
			return;
		}

		await createTodoAction(todoTask, timestamp, todolistId, categories);

		reset();
	}

	return (
		<div className="py-2">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2 items-start">
				<input
					{...register('todo', {
						required: true,
						maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
					})}
					type="text"
					placeholder="task... #category"
					autoComplete="off"
					className="border rounded drop-shadow-md p-2 w-full focus:outline-none"
				/>
				{errors.todo?.message && typeof errors.todo.message === 'string' && (
					<p className="text-red-500">{errors.todo?.message}</p>
				)}

				<div className="flex gap-10">
					<input {...register('date')} type="date" className="bg-transparent" />
					<input {...register('time')} type="time" step="1" className="bg-transparent" />
				</div>
			</form>
		</div>
	);
}

export default memo(TodoForm);
