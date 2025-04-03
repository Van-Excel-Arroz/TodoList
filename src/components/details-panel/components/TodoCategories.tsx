'use client';

import { Check, Plus, Tags } from 'lucide-react';
import { Category } from '@/utils/types';
import { addTodoCategoriesAction, deleteTodoCategoryAction } from '@/actions/category-action';
import useTodosStore from '@/context/TodosContext';
import CategoryTags from '../ui/CategoryTags';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { useState } from 'react';
import useCategoriesStore from '@/context/CategoriesContext';

export default function TodoCategories({ categories }: { categories: Category[] }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { deleteCategory } = useTodosStore();
	const { categories: categoriesFromStore } = useCategoriesStore();
	const [isMenuOpen, setIsMeuOpen] = useState(false);
	const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([]);
	const existingCategories = categories.map(cat => cat.category_title);
	const filteredCategories = categoriesFromStore.filter(cat => !existingCategories.includes(cat.category_title));

	const handleAddCategoryIds = async () => {
		await addTodoCategoriesAction(selectedCategoriesIds, selectedTodoId);
		handleCancelAddingCategory();
	};

	const handleCategoryClick = (categoryId: number) => {
		const isSelected = selectedCategoriesIds.find(id => id === categoryId);

		if (isSelected) {
			setSelectedCategoriesIds(ids => ids.filter(id => id !== categoryId));
		} else {
			setSelectedCategoriesIds(ids => [...ids, categoryId]);
		}
	};

	const handleCancelAddingCategory = () => {
		setIsMeuOpen(false);
		setSelectedCategoriesIds([]);
	};

	const handleRemoveCategory = async (categoryId: number) => {
		await deleteTodoCategoryAction(categoryId);
		deleteCategory(selectedTodoId, categoryId);
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<div className="flex items-center gap-2">
				<Tags size={20} className="text-slate-600" />
				<p>Categories</p>
			</div>
			<div className={`flex flex-wrap items-center gap-2`}>
				{categories.map(category => (
					<CategoryTags key={category.id} category={category} onRemove={handleRemoveCategory} />
				))}
				<Button
					darkMode={true}
					ariaLabel="Add Category"
					className="flex items-center gap-1"
					onClick={() => setIsMeuOpen(prev => !prev)}
				>
					<Plus size={13} />
					<p className="text-sm">Add Category</p>
				</Button>
			</div>
			<Menu open={isMenuOpen} onClose={() => setIsMeuOpen(false)} width="w-fit" className="-translate-y-1/2">
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Available Categories</p>
				</MenuItem>
				<div className="max-h-[40vh] overflow-hidden overflow-y-auto">
					{filteredCategories.map(category => (
						<MenuItem
							key={category.id}
							className="flex items-center justify-between"
							onClick={() => handleCategoryClick(category.id)}
						>
							<div className="flex items-center gap-2">
								<p style={{ color: category.hex_color }}>●</p>
								<p className="text-md">{category.category_title}</p>
							</div>
							{selectedCategoriesIds.includes(category.id) ? <Check size={18} className="text-slate-600" /> : null}
						</MenuItem>
					))}
				</div>
				<MenuItem className="border-t font-bold flex justify-between gap-2" clickable={false}>
					<Button ariaLabel="Cancel Adding Categories" onClick={handleCancelAddingCategory}>
						<p>Cancel</p>
					</Button>
					<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={() => handleAddCategoryIds()}>
						<p className="px-1">Add</p>
					</Button>
				</MenuItem>
			</Menu>
		</div>
	);
}
