'use client';

import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todolist-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { memo } from 'react';
import { Calendar, Timer } from 'lucide-react';

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
			<div className="flex gap-2 px-4 bg-white rounded-lg rounded-t-none w-full border border-t-0 text-gray-400 py-2 drop-shadow-md ">
				<Calendar size={16} />
				<Timer size={16} />
			</div>

			{/* <div className="flex gap-10">
				<label htmlFor="date" className="sr-only">
					Due Date
				</label>
				<input {...register('date')} type="date" className="bg-transparent" id="date" />
				<label htmlFor="time" className="sr-only">
					Due Time
				</label>
				<input {...register('time')} type="time" step="1" className="bg-transparent" id="time" />
			</div> */}
		</form>
	);
}

export default memo(TodoForm);
