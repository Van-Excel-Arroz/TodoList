'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { Repeat, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/types';
import { add, setHours, setMinutes, setSeconds } from 'date-fns';
import DueDateInput from '../ui/DueDateInput';

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
	const { addTodo } = useTodosStore();
	const [dueDate, setDueDate] = useState<Date>();

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
		const customDate: string | null = createTimestamp(data.date, data.time);
		const finalDate = customDate ?? (dueDate ? dueDate.toISOString() : null);

		const result = await createTodoAction(todoTask, finalDate, todolistId, categoryTitles);

		if (result) {
			const { todoId, validCategories } = result;
			const newTodo: Todo = {
				id: todoId,
				order_index: 0,
				task_text: todoTask,
				due_datetime: finalDate,
				creation_date: new Date().toISOString(),
				todo_list_id: todolistId,
				categories: validCategories,
				is_completed: false,
			};

			addTodo(newTodo);
		}
		setDueDate(undefined);
		reset();
	};

	const handleSetDueDate = (date?: 'today' | 'tomorrow' | 'next week') => {
		if (!date) {
			setDueDate(undefined);
			return;
		}
		let baseDate = new Date();

		switch (date) {
			case 'today':
				baseDate = new Date();
				break;
			case 'tomorrow':
				baseDate = add(new Date(), { days: 1 });
				break;
			case 'next week':
				baseDate = add(new Date(), { days: 7 });
				break;
		}
		const endOfDay = setSeconds(setMinutes(setHours(baseDate, 23), 59), 59);
		setDueDate(endOfDay);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-start rounded-lg outline outline-1 outline-slate-300 shadow-md hover:outline-slate-400 px-4"
		>
			<TodoInput register={register} />
			<div className="flex items-center justify-between w-full pb-1">
				<div className="flex items-center gap-2 text-slate-600">
					<DueDateInput handleSetDueDate={handleSetDueDate} dueDate={dueDate} />
					<Button ariaLabel="Repeat">
						<Repeat size={18} />
					</Button>
				</div>
				<AddButton />
			</div>
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
		className="pt-1 px-1 w-full focus:outline-none"
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
	</div>
);

const AddButton = () => (
	<Button type="submit" ariaLabel="Add new Todo">
		<SendHorizonal size={18} />
	</Button>
);

export default memo(TodoForm);
