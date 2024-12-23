'use client';

import { Plus, Tag } from 'lucide-react';
import { Category } from '@/types';
import { useEffect, useState } from 'react';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/category-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import CategoryForm from '../ui/CategoryForm';
import CategoryTags from '../ui/CategoryTags';
import { Button } from '@/components/ui-shared/Button';

interface TodoCategoriesProps {
	categories: Category[];
	todoId: number;
}

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function TodoCategories({ categories, todoId }: TodoCategoriesProps) {
	const { selectedTodo, updateSelectedTodoCategory, removeSelectedTodoCategory } = useSelectedTodoStore();
	const { addCategory, deleteCategory } = useTodosStore();

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
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center gap-2 pb-2 text-slate-600">
				<Tag size={16} />
				<p>Categories</p>
			</div>
			<div className="flex flex-col items-start rounded-md py-2">
				<div className="flex justify-between items-center w-full text-slate-600">
					<CategoryForm onSubmit={onSubmit} />
				</div>
				<div className={`flex flex-wrap items-center gap-2`}>
					{categories.map(category => (
						<CategoryTags key={category.id} category={category} onRemove={handleRemoveCategory} />
					))}
					d
				</div>
			</div>
		</div>
	);
}
