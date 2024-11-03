'use client';

import { useForm } from 'react-hook-form';
import { createTodo } from '@/actions/todolist-action';
import { extractCategory, removeCategories } from '@/utils/category';
import { memo } from 'react';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

interface TodoFormProps {
	todolistId: number;
	onAdd: (todo: Todo) => void;
}

function TodoForm({ todolistId, onAdd }: TodoFormProps) {
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

		const todoTask = removeCategories(data.todo);
		const categories = extractCategory(data.todo);
		let timestamp: string | null = data.date + ' ' + data.time;

		if (timestamp.trim() === '') timestamp = null;

		if (todoTask.trim() === '') {
			return;
		}

		const result = await createTodo(todoTask, categories, timestamp, todolistId);
		const todo = {
			id: result.id,
			task_text: todoTask,
			category: categories,
			due_datetime: timestamp,
			creation_date: result.creationDate,
			todo_list_id: todolistId,
		};

		onAdd(todo);

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
					className="border rounded drop-shadow-md p-2 w-full focus:outline-none"
				/>
				{errors.todo?.message && typeof errors.todo.message === 'string' && (
					<p className="text-red-500">{errors.todo?.message}</p>
				)}

				<div className="flex gap-10">
					<input {...register('date')} type="date" />
					<input {...register('time')} type="time" step="1" />
				</div>
			</form>
		</div>
	);
}

export default memo(TodoForm);
