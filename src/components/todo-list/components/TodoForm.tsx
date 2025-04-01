'use client';

import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import { extractCategory, extractTitle } from '@/utils/category-helper';
import Button from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/utils/types';
import TodoInput from '../ui/TodoInput';
import useCategoriesStore from '@/context/CategoriesContext';
import DueDateForm from '../ui/DueDateForm';

interface TodoFormData {
	todo?: string;
	date?: string;
	time?: string;
}

interface TodoFormProps {
	todolistId: number;
}

function TodoForm({ todolistId }: TodoFormProps) {
	const { register, handleSubmit, reset, watch } = useForm();
	const { addTodo } = useTodosStore();
	const { addCategory } = useCategoriesStore();
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);

	const extractLastPartCategory = (text: string | undefined): string | null => {
		if (!text) {
			return null;
		}
		const parts = text.split(' ');
		const lastPart = parts[parts.length - 1];
		if (lastPart.startsWith('#') && lastPart.length > 1) {
			return lastPart;
		} else {
			return null;
		}
	};

	const todoValue = watch('todo');
	const category = extractLastPartCategory(todoValue);

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (['Tab', 'Enter'].includes(event.key) && category !== null) {
			console.log('TAB PRESSED!');
		}
	};

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

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="my-4">
			<div className="w-full flex items-center gap-4 px-6 py-2 shadow-md hover:shadow-xl hover:border-slate-600 border border-slate-300 rounded-md bg-white">
				<input
					{...register('todo', {
						required: true,
						maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
					})}
					type="text"
					placeholder="Add a task... #Category"
					autoComplete="off"
					autoFocus
					className="w-full focus:outline-none"
					onKeyDown={handleInputKeyDown}
				/>
				{category && <p className="p-1 text-xs text-slate-600 bg-slate-200 rounded-md">Tab</p>}
				<DueDateForm dueDate={dueDate} setDueDate={setDueDate} />
				<Button
					type="submit"
					ariaLabel="Add new Todo"
					className="text-md text-slate-400s font-bold text-nowrap flex items-center justify-center"
				>
					+ Add Task
				</Button>
			</div>
		</form>
	);
}

export default memo(TodoForm);
