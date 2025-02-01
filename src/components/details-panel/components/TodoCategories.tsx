'use client';

import { Plus, Tag, Tags } from 'lucide-react';
import { Category } from '@/types';
import { addTodoCategoryAction, deleteTodoCategoryAction } from '@/actions/category-action';
import useTodosStore from '@/context/TodosContext';
import CategoryForm from '../ui/CategoryForm';
import CategoryTags from '../ui/CategoryTags';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useCategoriesStore from '@/context/CategoriesContext';
import { Button } from '@/components/ui-shared/Button';
import { useState } from 'react';

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function TodoCategories({ categories, todolistId }: { categories: Category[]; todolistId: number }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { addCategory, deleteCategory, updateCategoriesColor } = useTodosStore();
	const { addCategory: addCategoryFilter } = useCategoriesStore();
	const [isAddingCategory, setIsAddingCategory] = useState(false);

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
				<Tags size={20} className="text-slate-600" />
				<p>Categories</p>
			</div>
			<div className={`flex flex-wrap items-center gap-2`}>
				{categories.map(category => (
					<CategoryTags key={category.id} category={category} onRemove={handleRemoveCategory} />
				))}
				{!isAddingCategory && (
					<Button
						darkMode={true}
						ariaLabel="Add Category"
						onClick={() => setIsAddingCategory(true)}
						className="flex items-center gap-1"
					>
						<Plus size={13} />
						<Tag size={20} />
					</Button>
				)}
			</div>
			<div className="flex justify-between items-center w-full text-slate-600">
				{isAddingCategory && <CategoryForm onSubmit={handleOnSubmit} handleIsAddingCategory={setIsAddingCategory} />}
			</div>
		</div>
	);
}
