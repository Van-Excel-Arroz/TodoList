'use client';

import { Plus, Tags } from 'lucide-react';
import { Category } from '@/utils/types';
import { deleteTodoCategoryAction } from '@/actions/category-action';
import useTodosStore from '@/context/TodosContext';
import CategoryTags from '../ui/CategoryTags';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import Button from '@/components/ui-shared/Button';

export default function TodoCategories({ categories, todolistId }: { categories: Category[]; todolistId: number }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { deleteCategory } = useTodosStore();

	const handleRemoveCategory = async (categoryId: number) => {
		await deleteTodoCategoryAction(categoryId);
		deleteCategory(selectedTodoId, categoryId);
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
				<Button darkMode={true} ariaLabel="Add Category" className="flex items-center gap-1">
					<Plus size={13} />
					<p className="text-sm">Add Category</p>
				</Button>
			</div>
		</div>
	);
}
