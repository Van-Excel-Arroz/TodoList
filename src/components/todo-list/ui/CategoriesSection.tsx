import { deleteCategoryColorAction, updateCategoryColorAction } from '@/actions/category-action';
import Button from '@/components/ui-shared/Button';
import ColorSelectionMenu from '@/components/ui-shared/ColorSelectionMenu';
import Typography from '@/components/ui-shared/Typography';
import useCategoriesStore from '@/context/CategoriesContext';
import useTodosStore from '@/context/TodosContext';
import useQueryParams from '@/hooks/useQueryParams';
import { Palette, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoriesSection() {
	const { categories, updateColor, deleteCategory } = useCategoriesStore();
	const { updateCategoriesColor, deleteCategories } = useTodosStore();
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');

	const onSaveNewColor = async (categoryTitle: string, categoryColorId: number, newColor: string) => {
		const originalCategory = categories.find(cat => cat.id === categoryColorId);
		if (!originalCategory) return;
		const originalColor = originalCategory.hex_color;
		if (originalColor === newColor) return;

		updateColor(categoryColorId, newColor);
		updateCategoriesColor(categoryTitle, newColor);

		const result = await updateCategoryColorAction(categoryColorId, Number(todolistId), newColor);
		if (!result.success) {
			updateColor(categoryColorId, originalColor);
			updateCategoriesColor(categoryTitle, originalColor);
			toast.error(result.message);
		}
	};

	const onDeleteCategoryColor = async (categoryColorId: number) => {
		deleteCategory(categoryColorId);
		deleteCategories(categoryColorId);
		await deleteCategoryColorAction(categoryColorId, Number(todolistId));
	};

	return (
		<>
			<Typography>Category Management</Typography>
			<div className="flex-1 overflow-auto bg-slate-100 border px-5 py-2 rounded-md">
				{categories.length > 0 ? (
					categories.map(category => (
						<div key={category.id} className="flex items	-center justify-between py-1">
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
									horizontalPosition="right-0"
									verticalPosition="-bottom-24"
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
		</>
	);
}
