'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodoAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import useCategoriesStore from '@/context/CategoriesContext';
import DueDateForm from '../ui/DueDateForm';
import { Tag, X } from 'lucide-react';
import { CategoryTag } from '@/utils/types';

interface TodoFormData {
	todo?: string;
	date?: string;
	time?: string;
}

interface TodoFormProps {
	todolistId: number;
	accentColor: string;
}

export default function TodoForm({ todolistId, accentColor }: TodoFormProps) {
	const { register, handleSubmit, reset, watch, setValue } = useForm();
	const { addTodo } = useTodosStore();
	const { addCategory, getCategoryColor } = useCategoriesStore();
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);
	const [categories, setCategories] = useState<CategoryTag[]>([]);

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

	const categoryTagExists = () => {
		return categories.some(cat => cat.tagName === category);
	};

	const addCategoryTag = () => {
		if (category !== null) {
			if (categoryTagExists()) {
				return;
			}
			const hexColor = getCategoryColor(category, categories.length);
			const newTag = {
				tagName: category,
				color: hexColor,
			};
			setCategories(categories => [...categories, newTag]);
			const newValue = todoValue.replace(`#${category}`, '');
			setValue('todo', newValue, { shouldDirty: true });
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
		const newTodo = await createTodoAction(todoText, finalDate, todolistId, categories);

		if (newTodo) {
			addTodo(newTodo);
			if (newTodo.categories !== null) {
				newTodo.categories.map(cat => {
					addCategory(cat);
				});
			}
		}
		setDueDate(undefined);
		setCategories([]);
		reset();
	};

	return (
		<div className="my-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div
					className="w-full flex items-center gap-4 px-6 py-2 shadow-sm hover:shadow-md hover:ring-2 ring-offset-2 hover:ring-slate-400 focus:ring-slate-400 border rounded-md bg-white transition-all duration-100"
					style={{
						borderColor: `${accentColor}60`,
					}}
				>
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
					{category && !categoryTagExists() && (
						<Button ariaLabel="Add Category" darkMode={true} onClick={() => addCategoryTag()}>
							<p className="text-sm">Tab</p>
						</Button>
					)}
					<DueDateForm dueDate={dueDate} setDueDate={setDueDate} />
					<Button type="submit" ariaLabel="Add new Todo" className="text-md font-bold text-nowrap">
						+ Add Task
					</Button>
				</div>
			</form>
			{categories.length > 0 ? (
				<div className="flex items-center justify-between px-6 py-1 text-xs border-b border-x rounded-b-2xl">
					<div className="flex flex-wrap items-center gap-4">
						<Tag size={18} className="text-slate-600" />
						{categories.map(cat => (
							<p
								style={{
									color: cat.color,
									backgroundColor: `${cat.color}10`,
									borderColor: cat.color,
								}}
								className="text-xs rounded-full border px-2 py-[1px]"
								key={cat.tagName}
							>
								{cat.tagName}
							</p>
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
