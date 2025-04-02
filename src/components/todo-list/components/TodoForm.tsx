'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Todo } from '@/utils/types';
import useCategoriesStore from '@/context/CategoriesContext';
import DueDateForm from '../ui/DueDateForm';
import { X } from 'lucide-react';

interface TodoFormData {
	todo?: string;
	date?: string;
	time?: string;
}

interface TodoFormProps {
	todolistId: number;
}

function TodoForm({ todolistId }: TodoFormProps) {
	const { register, handleSubmit, reset, watch, setValue } = useForm();
	const { addTodo } = useTodosStore();
	const { addCategory, getLatestCategoryId } = useCategoriesStore();
	console.log(getLatestCategoryId());
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);
	const [categories, setCategories] = useState<string[]>([]);

	const extractLastPartCategory = (text: string | undefined): string | null => {
		if (!text) {
			return null;
		}
		const parts = text.trim().split(' ');
		const lastPart = parts[parts.length - 1];
		if (lastPart.startsWith('#') && lastPart.length > 1) {
			return lastPart.slice(1);
		} else {
			return null;
		}
	};

	const todoValue = watch('todo');
	const category = extractLastPartCategory(todoValue);

	const addCategoryTag = () => {
		if (category !== null) {
			setCategories(categories => [...categories, category]);
			const newValue = todoValue.replace(`#${category}`, '');
			setValue('todo', newValue);
		}
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			addCategoryTag();
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
		const todoText = data.todo?.trim();
		if (!todoText) return;

		const customDate: string | null = createTimestamp(data.date, data.time);
		const finalDate = customDate ?? (dueDate ? dueDate : null);

		const result = await createTodoAction(todoText, finalDate, todolistId, categories);

		if (result) {
			const { todoId, validCategories } = result;
			const newTodo: Todo = {
				id: todoId,
				order_index: 0,
				task_text: todoText,
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
		setCategories([]);
		reset();
	};

	return (
		<div className="py-2 mb-4">
			<form onSubmit={handleSubmit(onSubmit)}>
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
					{category && (
						<Button ariaLabel="Add Category" darkMode={true} onClick={() => addCategoryTag()}>
							<p className="text-sm">Tab</p>
						</Button>
					)}
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
			{categories.length > 0 ? (
				<div className="flex items-center justify-between px-6 py-1 bg-slate-100 text-xs border-b border-x rounded-b-md">
					<div className="flex items-center gap-4">
						{categories.map((cat, idx) => (
							<p key={idx}>{cat}</p>
						))}
					</div>
					<Button ariaLabel="Remove Categories" onClick={() => setCategories([])}>
						<X size={18} />
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default memo(TodoForm);
