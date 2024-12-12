'use client';

import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';

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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-start rounded-lg outline outline-1 outline-slate-300 shadow-md hover:outline-slate-400"
		>
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
		autoFocus
		className="py-2 px-4 w-full focus:outline-none"
	/>
);

const TodoDateTimeInputs = ({ register }: { register: any }) => (
	<div className="flex flex-wrap gap-2 justify-between px-4 pb-2 w-full text-sm">
		<div className="flex gap-10">
			<input
				{...register('date')}
				type="date"
				className="focus:outline-slate-400 cursor-pointer hover:outline hover:outline-1 hover:outline-slate-400 rounded-lg"
				id="date"
				aria-label="Due Date"
			/>

			<input
				{...register('time')}
				type="time"
				step="1"
				className="focus:outline-slate-400 cursor-pointer hover:outline hover:outline-1 hover:outline-slate-400 rounded-lg"
				id="time"
				aria-label="Due Time"
			/>
		</div>
		<AddButton />
	</div>
);

const AddButton = () => (
	<Button type="submit" ariaLabel="Add new Todo">
		<SendHorizonal size={20} />
	</Button>
);

export default memo(TodoForm);
