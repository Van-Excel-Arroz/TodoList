'use client';

import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todolist-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { memo } from 'react';

interface TodoFormProps {
	todolistId: number;
}

function TodoForm({ todolistId }: TodoFormProps) {
	const { register, handleSubmit, reset } = useForm();

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

		const todoTask: string = extractTitle(data.todo);
		const categoryTitles: string[] = extractCategory(data.todo);
		let timestamp: string | null = data.date + ' ' + data.time;

		if (timestamp.trim() === '') timestamp = null;

		if (todoTask.trim() === '') {
			return;
		}

		await createTodoAction(todoTask, timestamp, todolistId, categoryTitles);

		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col items-start">
			<input
				{...register('todo', {
					required: true,
					maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
				})}
				type="text"
				placeholder="Add a task... #Category"
				autoComplete="off"
				className="border rounded-lg rounded-b-none py-2 px-4 w-full drop-shadow-md focus:outline-none focus:border-slate-400 hover:border-slate-400"
			/>
			<div className="flex gap-10 px-4 py-2 bg-white rounded-lg rounded-t-none w-full border border-t-0 drop-shadow-md text-sm">
				<input
					{...register('date')}
					type="date"
					className="bg-transparent focus:outline-slate-400"
					id="date"
					aria-label="Due Date"
				/>

				<input
					{...register('time')}
					type="time"
					step="1"
					className="bg-transparent focus:outline-slate-400"
					id="time"
					aria-label="Due Time"
				/>
			</div>
		</form>
	);
}

export default memo(TodoForm);
