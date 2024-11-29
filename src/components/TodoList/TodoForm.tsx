'use client';

import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todolist-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { memo } from 'react';

interface TodoFormData {
	todo?: string;
	date?: string;
	time?: string;
}

interface TodoFormProps {
	todolistId: number;
}

function TodoForm({ todolistId }: TodoFormProps) {
	const { register, handleSubmit, reset } = useForm();

	const createTimestamp = (date: string | undefined, time: string | undefined): string | null => {
		const now = new Date().toISOString().split('T')[0];
		if (!date && !time) return null;
		if (!date && time) date = now;
		if (!time && date) time = '23:59:59';
		return `${date} ${time}`.trim() || null;
	};

	const onSubmit = async (data: TodoFormData) => {
		if (!data.todo?.trim()) return;

		const todoTask: string = extractTitle(data.todo);
		if (todoTask.trim() === '') return;

		const categoryTitles: string[] = extractCategory(data.todo);
		const timestamp: string | null = createTimestamp(data.date, data.time);

		await createTodoAction(todoTask, timestamp, todolistId, categoryTitles);

		reset();
	};

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
