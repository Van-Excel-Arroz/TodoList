'use client';

import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';

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
		const categoryTitles: string[] = extractCategory(data.todo);
		const timestamp: string | null = createTimestamp(data.date, data.time);

		await createTodoAction(todoTask, timestamp, todolistId, categoryTitles);

		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col items-start">
			<TodoInput register={register} />
			<TodoDateTimeInputs register={register} />
		</form>
	);
}

const TodoInput = ({ register }: { register: any }) => (
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
);

const TodoDateTimeInputs = ({ register }: { register: any }) => (
	<div className="flex justify-between px-4 py-1 bg-white rounded-lg rounded-t-none w-full border border-t-0 drop-shadow-md text-sm">
		<div className="flex gap-10">
			<input
				{...register('date')}
				type="date"
				className="bg-transparent focus:outline-slate-400 cursor-pointer"
				id="date"
				aria-label="Due Date"
			/>

			<input
				{...register('time')}
				type="time"
				step="1"
				className="bg-transparent focus:outline-slate-400 cursor-pointer"
				id="time"
				aria-label="Due Time"
			/>
		</div>
		<AddButton />
	</div>
);

const AddButton = () => (
	<button
		type="submit"
		className="border rounded-lg py-1 px-2 text-sm hover:bg-gray-100 active:bg-gray-200"
		aria-label="Add new todo"
	>
		Add
	</button>
);

export default memo(TodoForm);
