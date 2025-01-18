'use client';

import { Tag } from 'lucide-react';
import { Category } from '@/types';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/category-action';
import useTodosStore from '@/context/TodosContext';
import CategoryForm from '../ui/CategoryForm';
import CategoryTags from '../ui/CategoryTags';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useCategoriesStore from '@/context/CategoriesContext';

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function TodoCategories({ categories, todolistId }: { categories: Category[]; todolistId: number }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { addCategory, deleteCategory, updateCategoriesColor } = useTodosStore();
	const { addCategory: addCategoryFilter } = useCategoriesStore();

	const handleRemoveCategory = async (categoryId: number) => {
		await deleteTodoCategoryAction(categoryId);
		deleteCategory(selectedTodoId, categoryId);
	};

	const handleOnSubmit = async (data: CategoryFormInputs) => {
		const categoryId = await addTodoCategoryAction(data.category_title, data.hex_color, todolistId, selectedTodoId);

		if (!categoryId) return;

		const newCategory: Category = {
			id: categoryId,
			category_title: data.category_title,
			hex_color: data.hex_color,
			is_selected: false,
			todo_list_id: todolistId,
		};

		updateCategoriesColor(data.category_title, data.hex_color);
		addCategoryFilter(newCategory);
		addCategory(selectedTodoId, newCategory);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<Tag size={16} className="text-slate-600" />
				<p>Categories</p>
			</div>
			<div className={`flex flex-wrap items-center gap-2`}>
				{categories.map(category => (
					<CategoryTags key={category.id} category={category} onRemove={handleRemoveCategory} />
				))}
			</div>
			<div className="flex justify-between items-center w-full text-slate-600">
				<CategoryForm onSubmit={handleOnSubmit} />
			</div>
		</div>
	);
}
