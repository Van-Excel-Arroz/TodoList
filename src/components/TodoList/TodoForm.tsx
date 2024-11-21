'use client';

import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todolist-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { memo } from 'react';
import { Todo } from '@/types';

interface TodoFormProps {
	todolistId: number;
	onAddTodo: (newTodo: Todo) => void;
}

function TodoForm({ todolistId, onAddTodo }: TodoFormProps) {
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

		const now = new Date();
		const dateNow = now.toISOString().split('T')[0];
		if (!data.date && data.time) {
			data.date = dateNow;
		}

		const todoTask = extractTitle(data.todo);
		const categories = extractCategory(data.todo);
		let timestamp: string | null = data.date + ' ' + data.time;

		if (timestamp.trim() === '') timestamp = null;

		if (todoTask.trim() === '') {
			return;
		}

		const { todoId, categoriesId } = await createTodoAction(todoTask, timestamp, todolistId, categories);
		const todoObj: Todo = {
			id: todoId!,
			task_text: todoTask,
			due_datetime: timestamp,
			creation_date: dateNow,
			is_completed: false,
			categories_id: categoriesId,
			todo_list_id: todolistId,
		};
		onAddTodo(todoObj);

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
					<label htmlFor="date" className="sr-only">
						Due Date
					</label>
					<input {...register('date')} type="date" className="bg-transparent" id="date" />
					<label htmlFor="time" className="sr-only">
						Due Time
					</label>
					<input {...register('time')} type="time" step="1" className="bg-transparent" id="time" />
				</div>
			</form>
		</div>
	);
}

export default memo(TodoForm);
