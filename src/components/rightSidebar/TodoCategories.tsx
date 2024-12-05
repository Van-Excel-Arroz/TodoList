'use client';

import { Plus, SendHorizontal, X } from 'lucide-react';
import { Category } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTodoStore from '@/context/TodoContext';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/todolist-action';

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

interface TodoCategoriesProps {
	categories: Category[];
	todoId: number;
}

export default function TodoCategories({ categories, todoId }: TodoCategoriesProps) {
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const { register, handleSubmit, reset } = useForm<CategoryFormInputs>();
	const { selectedTodo, updateSelectedTodoCategory, removeSelectedTodoCategory } = useTodoStore();

	useEffect(() => {
		setIsAddingCategory(false);
	}, [todoId]);

	const handleAddCategory = (val: boolean) => {
		setIsAddingCategory(val);
		reset();
	};

	const handleRemoveCategory = async (categoryId: number) => {
		await deleteTodoCategoryAction(categoryId, todoId, selectedTodo!.todo_list_id);
		removeSelectedTodoCategory(categoryId);
	};

	const onSubmit = async (data: CategoryFormInputs) => {
		const categoryId = await addTodoCategoryAction(
			data.category_title,
			data.hex_color,
			selectedTodo!.todo_list_id,
			todoId
		);
		const newCategory: Category = {
			id: categoryId!,
			category_title: data.category_title,
			hex_color: data.hex_color,
			is_selected: false,
			todo_list_id: selectedTodo!.todo_list_id,
		};

		updateSelectedTodoCategory(newCategory);
		reset();
		handleAddCategory(false);
	};
	return (
		<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<div className="flex justify-between items-center w-full text-slate-600">
				<p className="text-sm">Categories</p>
				{isAddingCategory ? (
					<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 justify-end">
						<input type="color" className="w-5 h-5 cursor-pointer" defaultValue="#000000" {...register('hex_color')} />
						<input
							type="text"
							className="border rounded-md w-1/2 p-1 text-sm focus:outline-none focus:border-slate-400 hover:border-slate-400"
							placeholder="Category Title"
							autoComplete="off"
							{...register('category_title', { maxLength: 20 })}
						/>
						<button className="hover:bg-slate-200 rounded-md p-1" aria-label="Add Category" type="submit">
							<SendHorizontal size={20} />
						</button>
						<button
							onClick={() => handleAddCategory(false)}
							className="hover:bg-slate-200 rounded-md p-1"
							aria-label="Cancel Adding Category"
						>
							<X size={20} />
						</button>
					</form>
				) : (
					<button
						className="block hover:bg-slate-200 rounded-md p-1"
						aria-label="Add Category"
						onClick={() => handleAddCategory(true)}
					>
						<Plus size={20} />
					</button>
				)}
			</div>
			<div className={`flex flex-wrap items-center gap-2 ${categories.length === 0 ? 'py-0' : 'py-2'}`}>
				{categories.map(category => (
					<span
						key={category.id}
						className="rounded-md flex items-center gap-2 px-2 py-1"
						style={{
							color: category.hex_color,
							backgroundColor: `${category.hex_color}20`,
						}}
					>
						<p>{category.category_title}</p>
						<button
							className={`hover:bg-white active:bg-white rounded-md p-1`}
							aria-label="Remove Category"
							onClick={() => handleRemoveCategory(category.id)}
						>
							<X size={16} />
						</button>
					</span>
				))}
			</div>
		</div>
	);
}
