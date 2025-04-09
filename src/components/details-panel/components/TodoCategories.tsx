'use client';

import { Check, Plus, Tags } from 'lucide-react';
import { Category } from '@/utils/types';
import { addTodoCategoriesAction, removeCategoryFromTodoAction } from '@/actions/category-action';
import useTodosStore from '@/context/TodosContext';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { useState } from 'react';
import useCategoriesStore from '@/context/CategoriesContext';
import CategoryTag from '../ui/CategoryTag';

export default function TodoCategories({ categories }: { categories: Category[] }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { deleteCategory, addCategory } = useTodosStore();
	const { categories: categoriesFromStore } = useCategoriesStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
	const existingCategories = categories.map(cat => cat.id);
	const filteredCategories = categoriesFromStore.filter(cat => !existingCategories.includes(cat.id));

	const handleAddCategoryIds = async () => {
		if (selectedCategories.length === 0) return;
		const categoriesIds = selectedCategories.map(cat => cat.id);
		await addTodoCategoriesAction(categoriesIds, selectedTodoId);
		selectedCategories.map(cat => {
			addCategory(selectedTodoId, cat);
		});
		handleCancelAddingCategory();
	};

	const handleCategoryClick = (category: Category) => {
		const isSelected = selectedCategories.find(cat => cat.id === category.id);

		if (isSelected) {
			setSelectedCategories(cats => cats.filter(cat => cat.id !== category.id));
		} else {
			setSelectedCategories(cats => [...cats, category]);
		}
	};

	const handleCancelAddingCategory = () => {
		setIsMenuOpen(false);
		setSelectedCategories([]);
	};

	const handleRemoveCategoryFromTodo = async (categoryColorId: number, todoId: number) => {
		await removeCategoryFromTodoAction(categoryColorId, todoId);
		deleteCategory(selectedTodoId, categoryColorId);
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<div className="flex items-center gap-2">
				<Tags size={20} className="text-slate-600" />
				<p>Categories</p>
			</div>
			<div className={`flex flex-wrap items-center gap-2`}>
				{categories.map(category => (
					<CategoryTag
						key={category.id}
						category={category}
						todoId={selectedTodoId}
						onRemove={handleRemoveCategoryFromTodo}
					/>
				))}
				<Button
					darkMode={true}
					ariaLabel="Add Category"
					className="flex items-center gap-1"
					onClick={() => setIsMenuOpen(prev => !prev)}
				>
					<Plus size={13} />
					<p className="text-sm">Add Category</p>
				</Button>
			</div>
			<Menu open={isMenuOpen} onClose={() => handleCancelAddingCategory()} width="w-64" verticalPosition="bottom-10">
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Available Categories</p>
				</MenuItem>
				<div className="max-h-[30vh] overflow-hidden overflow-y-auto">
					{filteredCategories.length > 0 ? (
						filteredCategories.map(category => (
							<MenuItem
								key={category.id}
								className="flex items-center justify-between"
								onClick={() => handleCategoryClick(category)}
							>
								<div className="flex items-center gap-2">
									<p style={{ color: category.hex_color }}>●</p>
									<p className="text-md">{category.category_title}</p>
								</div>
								{selectedCategories.includes(category) ? <Check size={18} className="text-slate-600" /> : null}
							</MenuItem>
						))
					) : (
						<p className="py-6 px-3 text-slate-600">No more categories to add.</p>
					)}
				</div>
				<MenuItem className="border-t font-bold flex justify-between gap-2" clickable={false}>
					<Button ariaLabel="Cancel Adding Categories" onClick={handleCancelAddingCategory}>
						<p className="text-sm">Cancel</p>
					</Button>
					<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={() => handleAddCategoryIds()}>
						<p className="px-1 text-sm">Add</p>
					</Button>
				</MenuItem>
			</Menu>
		</div>
	);
}
