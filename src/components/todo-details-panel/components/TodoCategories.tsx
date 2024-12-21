'use client';

import { Plus, Tag } from 'lucide-react';
import { Category } from '@/types';
import { useEffect, useState } from 'react';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/category-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import CategoryForm from '../ui/CategoryForm';
import CategoryTags from '../ui/CategoryTags';
import { Button } from '@/components/ui/Button';

interface TodoCategoriesProps {
	categories: Category[];
	todoId: number;
}

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function TodoCategories({ categories, todoId }: TodoCategoriesProps) {
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const { selectedTodo, updateSelectedTodoCategory, removeSelectedTodoCategory } = useSelectedTodoStore();
	const { addCategory, deleteCategory } = useTodosStore();

	useEffect(() => {
		setIsAddingCategory(false);
	}, [todoId]);

	const handleAddCategory = (val: boolean) => {
		setIsAddingCategory(val);
	};

	const handleRemoveCategory = async (categoryId: number) => {
		await deleteTodoCategoryAction(categoryId);
		removeSelectedTodoCategory(categoryId);
		deleteCategory(todoId, categoryId);
	};

	const onSubmit = async (data: CategoryFormInputs) => {
		const categoryId = await addTodoCategoryAction(
			data.category_title,
			data.hex_color,
			selectedTodo!.todo_list_id,
			todoId
		);

		if (!categoryId) return;

		const newCategory: Category = {
			id: categoryId!,
			category_title: data.category_title,
			hex_color: data.hex_color,
			is_selected: false,
			todo_list_id: selectedTodo!.todo_list_id,
		};

		updateSelectedTodoCategory(newCategory);
		addCategory(todoId, newCategory);
		handleAddCategory(false);
	};
	return (
		<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<div className="flex justify-between items-center w-full text-slate-600">
				{!isAddingCategory && (
					<div className="flex items-center gap-2 pl-1">
						<Tag size={16} />
						<p className="text-sm">Categories</p>
					</div>
				)}
				{isAddingCategory ? (
					<CategoryForm onSubmit={onSubmit} onCancel={() => handleAddCategory(false)} />
				) : (
					<Button ariaLabel="Add Category" onClick={() => handleAddCategory(true)}>
						<Plus size={20} />
					</Button>
				)}
			</div>
			<div className={`flex flex-wrap items-center gap-2 ${categories.length === 0 ? 'py-0' : 'py-2'}`}>
				{categories.map(category => (
					<CategoryTags key={category.id} category={category} onRemove={handleRemoveCategory} />
				))}
			</div>
		</div>
	);
}
