import {
	addCategoryColorAction,
	deleteCategoryColorAction,
	updateCategoryColorAction,
} from '@/actions/category-action';
import Button from '@/components/ui-shared/Button';
import ColorSelectionMenu from '@/components/ui-shared/ColorSelectionMenu';
import useCategoriesStore from '@/context/CategoriesContext';
import useTodosStore from '@/context/TodosContext';
import useQueryParams from '@/hooks/useQueryParams';
import { Category } from '@/utils/types';
import { Palette, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CategoriesSection({ headerTextStyle }: { headerTextStyle: string }) {
	const { categories, addCategory, updateColor, deleteCategory, isCategoryTitleUnique } = useCategoriesStore();
	const { updateCategoriesColor, deleteCategories } = useTodosStore();
	const { register, handleSubmit, reset } = useForm();
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [selectedColor, setSelectedColor] = useState('#6b7280');

	const onSaveNewColor = async (categoryTitle: string, categoryColorId: number, newColor: string) => {
		updateColor(categoryColorId, newColor);
		updateCategoriesColor(categoryTitle, newColor);
		await updateCategoryColorAction(categoryColorId, Number(todolistId), newColor);
	};

	const onDeleteCategoryColor = async (categoryColorId: number) => {
		deleteCategory(categoryColorId);
		deleteCategories(categoryColorId);
		await deleteCategoryColorAction(categoryColorId, Number(todolistId));
	};

	const onSubmit = async (data: { category?: string }) => {
		const newCategoryTitle = data.category?.trim();
		const parseTodolistId = Number(todolistId);
		if (!newCategoryTitle || !isCategoryTitleUnique(newCategoryTitle)) return;

		const newCategoryId = await addCategoryColorAction(newCategoryTitle, selectedColor, parseTodolistId);
		if (!newCategoryId) return;

		const newCategory: Category = {
			id: newCategoryId,
			category_title: newCategoryTitle,
			hex_color: selectedColor,
			todo_list_id: parseTodolistId,
		};

		addCategory(newCategory);
		reset();
	};

	return (
		<>
			<p className={headerTextStyle}>Category Management</p>
			<div className="flex-1 overflow-hidden overflow-y-auto bg-slate-100 border px-5 py-2 rounded-md">
				{categories.length > 0 ? (
					categories.map(category => (
						<div key={category.id} className="flex items-center justify-between py-1">
							<div className="flex items-center gap-2">
								<p className="text-2xl" style={{ color: category.hex_color }}>
									●
								</p>
								<p>{category.category_title}</p>
							</div>
							<div className="flex items-center gap-2">
								<ColorSelectionMenu
									initialColor={category.hex_color}
									onColorSelect={newColor => onSaveNewColor(category.category_title, category.id, newColor)}
								>
									<Palette size={20} className="text-slate-600" />
								</ColorSelectionMenu>
								<Button ariaLabel="Delete Category" onClick={() => onDeleteCategoryColor(category.id)}>
									<Trash2 size={20} className="text-red-600" />
								</Button>
							</div>
						</div>
					))
				) : (
					<p className="py-6 px-3 text-slate-600 text-center">No available categories.</p>
				)}
			</div>
			<p className={headerTextStyle}>Add New Category</p>
			<div className="flex items-center gap-2 pt-2">
				<ColorSelectionMenu
					initialColor={selectedColor}
					verticalPosition="top-12"
					onColorSelect={newColor => setSelectedColor(newColor)}
				>
					<div
						aria-label="Select Color for Category"
						className="w-10 h-10 rounded-lg cursor-pointer relative hover:scale-105 transition-scale duration-75"
						style={{
							backgroundColor: selectedColor,
						}}
					/>
				</ColorSelectionMenu>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
					<input
						type="text"
						autoComplete="off"
						className="py-2 px-4 border rounded-md border-slate-300 hover:border-slate-600 focus:outline-none flex-1"
						placeholder="Category Name"
						{...register('category', { maxLength: 20 })}
					/>
					<Button type="submit" ariaLabel="Add New Category" className="p-2 text-md font-bold text-nowrap">
						+ Add Task
					</Button>
				</form>
			</div>
		</>
	);
}
