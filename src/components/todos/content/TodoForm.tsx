'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { CalendarPlus, Repeat, SendHorizonal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/types';
import { add, format, isToday, isTomorrow, setHours, setMinutes, setSeconds } from 'date-fns';

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
					<DueDate handleSetDueDate={handleSetDueDate} dueDate={dueDate} />
					<Button ariaLabel="Repeat">
						<Repeat size={18} />
					</Button>
				</div>
				<AddButton />
			</div>
		</form>
	);
}

const DueDate = ({
	handleSetDueDate,
	dueDate,
}: {
	handleSetDueDate: (date?: 'today' | 'tomorrow' | 'next week') => void;
	dueDate: Date | undefined;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuItemStyle = 'hover:bg-slate-200 p-2 cursor-pointer';

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	const handleDateFormat = (date: Date) => {
		if (isToday(date)) return format(date, "'Today at' h:mm a");
		if (isTomorrow(date)) return format(date, "'Tomorrow at' h:mm a");
		return format(date, "EEE, MMMM d 'at' h:mm a");
	};

	return (
		<div className="relative flex" onBlur={handleInputBlur} tabIndex={-1}>
			<Button ariaLabel="Add Due Date" onClick={() => setIsOpen(prev => !prev)}>
				{dueDate ? <p className="text-sm">{handleDateFormat(dueDate)}</p> : <CalendarPlus size={18} />}
			</Button>

			<div
				className={`absolute top-10 -left-4 bg-white text-center text-black text-sm rounded-lg 
    flex flex-col w-44 border border-gray-300 shadow-lg
    before:content-[''] before:absolute before:-top-2 before:left-5 before:w-4 before:h-4 
    before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45
    ${isOpen ? 'block' : 'hidden'}`}
			>
				<p className="border-b border-gray-200 p-2 font-medium">
					{dueDate ? format(dueDate, 'MM/dd/yy hh:mm:ss a') : 'Select Due Date'}
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('today')}>
					Today ({format(new Date(), 'EEE')})
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('tomorrow')}>
					Tommorow ({format(add(new Date(), { days: 1 }), 'EEE')})
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('next week')}>
					Next {format(add(new Date(), { days: 7 }), 'EEEE')}
				</p>
				<p className={menuItemStyle}>Custom</p>
				{dueDate && (
					<button
						aria-label="Clear Due Date"
						onClick={() => handleSetDueDate()}
						className={`flex items-center justify-center gap-2 border-t border-slate-300 ${menuItemStyle}`}
					>
						<Trash2 size={16} />
						<p>Clear</p>
					</button>
				)}
			</div>
		</div>
	);
};

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
