'use client';

import { Plus, SendHorizontal, X } from 'lucide-react';
import { Category } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTodoStore from '@/context/TodoContext';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/todolist-action';
import CategoryForm from './CategoryForm';
import CategoryTag from './CategoryTag';

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
		console.log(`remove categoryId ${categoryId} and todoId ${todoId}`);
		await deleteTodoCategoryAction(categoryId, selectedTodo!.todo_list_id);
		removeSelectedTodoCategory(categoryId);
	};

	const onSubmit = async (data: CategoryFormInputs) => {
		const categoryId = await addTodoCategoryAction(
			data.category_title,
			data.hex_color,
			selectedTodo!.todo_list_id,
			todoId
		);

		console.log(`submitting categoryId ${categoryId}`);
		if (!categoryId) return;

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
					<CategoryForm onSubmit={onSubmit} onCancel={() => handleAddCategory(false)} />
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
					<CategoryTag key={category.id} category={category} onRemove={handleRemoveCategory} />
				))}
			</div>
		</div>
	);
}
