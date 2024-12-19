'use client';

import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { AlarmClockPlus, CalendarPlus, Repeat, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/types';
import { add, format } from 'date-fns';

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

		const result = await createTodoAction(todoTask, timestamp, todolistId, categoryTitles);

		if (result) {
			const { todoId, validCategories } = result;
			const newTodo: Todo = {
				id: todoId,
				order_index: 0,
				task_text: todoTask,
				due_datetime: timestamp,
				creation_date: new Date().toISOString(),
				todo_list_id: todolistId,
				categories: validCategories,
				is_completed: false,
			};

			addTodo(newTodo);
		}

		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-start rounded-lg outline outline-1 outline-slate-300 shadow-md hover:outline-slate-400 px-4"
		>
			<TodoInput register={register} />
			{/* <TodoDateTimeInputs register={register} /> */}
			<div className="flex items-center justify-between w-full pb-1">
				<div className="flex items-center gap-2 text-slate-600">
					<Button ariaLabel="Add Due Date">
						<CalendarPlus size={18} />
						<div className="absolute top-10 -left-4 bg-white border-2 border-slate-300  rounded-md flex flex-col w-44">
							<p className="border-b-2 border-slate-300 py-2">Select Due Date</p>
							<p className="hover:bg-slate-200 p-2">Today ({format(new Date(), 'EEE')})</p>
							<p className="hover:bg-slate-200 p-2">Tommorow ({format(add(new Date(), { days: 1 }), 'EEE')})</p>
							<p className="hover:bg-slate-200 p-2">Next {format(add(new Date(), { days: 7 }), 'EEEE')}</p>
							<p className="hover:bg-slate-200 py-2">Custom</p>
						</div>
					</Button>
					<Button ariaLabel="Add Due Time">
						<AlarmClockPlus size={18} />
					</Button>
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
