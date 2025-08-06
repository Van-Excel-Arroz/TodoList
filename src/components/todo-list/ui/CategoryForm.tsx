import { addCategoryColorAction } from '@/actions/category-action';
import Button from '@/components/ui-shared/Button';
import ColorSelectionMenu from '@/components/ui-shared/ColorSelectionMenu';
import Typography from '@/components/ui-shared/Typography';
import useCategoriesStore from '@/context/CategoriesContext';
import useQueryParams from '@/hooks/useQueryParams';
import { Category } from '@/utils/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CategoryForm() {
	const { addCategory, isCategoryTitleUnique } = useCategoriesStore();
	const [selectedColor, setSelectedColor] = useState('#6b7280');
	const { register, handleSubmit, reset } = useForm();
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');

	const onSubmit = async (data: { category?: string }) => {
		const newCategoryTitle = data.category?.trim();
		const parseTodolistId = Number(todolistId);
		if (!newCategoryTitle || !isCategoryTitleUnique(newCategoryTitle)) return;

		const result = await addCategoryColorAction(newCategoryTitle, selectedColor, parseTodolistId);

		if (!result.success) return toast.error(result.message);

		const newCategory: Category = {
			id: result.data!,
			category_title: newCategoryTitle,
			hex_color: selectedColor,
			todo_list_id: parseTodolistId,
		};

		addCategory(newCategory);
		reset();
		toast.success(result.message);
	};

	return (
		<>
			<Typography className="pt-2">Add New Category</Typography>
			<div className="flex items-center gap-2 pt-2">
				<ColorSelectionMenu
					initialColor={selectedColor}
					verticalPosition="-top-24"
					horizontalPosition="left-0"
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
