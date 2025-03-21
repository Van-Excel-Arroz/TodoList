'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category';
import { Calendar, CalendarCheck, Repeat, Trash2 } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/utils/types';
import TodoInput from '../ui/TodoInput';
import DueDate from '../../ui-shared/DueDate';
import DueTime from '@/components/ui-shared/DueTime';
import useCategoriesStore from '@/context/CategoriesContext';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';

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
	const { addCategory } = useCategoriesStore();
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);

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
		const finalDate = customDate ?? (dueDate ? dueDate : null);

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
				completed_at: null,
				is_completed: false,
				is_important: false,
			};

			addTodo(newTodo);
			validCategories.map(cat => {
				addCategory(cat);
			});
		}
		setDueDate(undefined);
		reset();
	};

	const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="w-full flex items-center gap-4 py-2">
				<TodoInput register={register} />
				<div className="flex items-center gap-1 text-slate-600">
					<div className="relative">
						<Button ariaLabel="Select Due Date" onClick={() => setIsDueDateMenuOpen(true)}>
							{dueDate ? <CalendarCheck size={20} /> : <Calendar size={20} />}
						</Button>
						<Menu
							open={isDueDateMenuOpen}
							onClose={() => setIsDueDateMenuOpen(false)}
							posX="-right-5"
							posXNotch="before:right-7"
							width="w-44"
						>
							<MenuItem className="border-b border-gray-200 font-bold flex flex-col items-center" clickable={false}>
								<p>Select Due Date</p>
							</MenuItem>
							<MenuItem clickable={false}>
								<DueDate dueDate={dueDate} setDueDate={setDueDate} defaultEmptyText={true} />
							</MenuItem>
							<MenuItem clickable={false}>
								<DueTime dueDate={dueDate} setDueDate={setDueDate} defaultEmptyText={true} />
							</MenuItem>
							<MenuItem className="border-t border-slate-300" onClick={() => setDueDate(undefined)}>
								<Trash2 size={16} />
								<p>Clear</p>
							</MenuItem>
						</Menu>
					</div>
					<Button ariaLabel="Repeat">
						<Repeat size={18} />
					</Button>
				</div>
				<Button
					type="submit"
					ariaLabel="Add new Todo"
					darkMode={true}
					className="w-32 h-9 text-sm lg:text-md flex items-center justify-center"
				>
					+ Add Task
				</Button>
			</div>
		</form>
	);
}

export default memo(TodoForm);
