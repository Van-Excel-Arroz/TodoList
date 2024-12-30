'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { Repeat, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/types';
import TodoInput from '../ui/TodoInput';
import DatePicker from '../../ui-shared/DatePicker';
import TimePicker from '@/components/ui-shared/TimePicker';

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
				description: null,
				due_datetime: finalDate,
				creation_date: new Date().toISOString(),
				todo_list_id: todolistId,
				categories: validCategories,
				is_completed: false,
				is_important: false,
			};

			addTodo(newTodo);
		}
		setDueDate(undefined);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-white flex flex-col gap-1 items-start rounded-lg outline-2 outline-dashed outline-slate-300  hover:outline-slate-400 px-4"
		>
			<TodoInput register={register} />
			<div className="flex items-center justify-between w-full pb-1">
				<div className="flex items-center gap-1 text-slate-600">
					<DatePicker dueDate={dueDate} setDueDate={setDueDate} />
					<TimePicker dueDate={dueDate} setDueDate={setDueDate} />
					<Button ariaLabel="Repeat">
						<Repeat size={18} />
					</Button>
				</div>
				<Button type="submit" ariaLabel="Add new Todo">
					<SendHorizonal size={18} />
				</Button>
			</div>
		</form>
	);
}

export default memo(TodoForm);
