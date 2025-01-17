import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useCategoriesStore from '@/context/CategoriesContext';
import useQueryParams from '@/hooks/useQueryParams';
import { updateIsSelectedCategoryColors } from '@/lib/category';
import { MenuOpenProps } from '@/types';
import { CheckIcon } from 'lucide-react';
import { useEffect } from 'react';

interface CategoryFilterMenuProps extends MenuOpenProps {}

export default function CategoryFilterMenu({ isOpen, setIsOpen }: CategoryFilterMenuProps) {
	const { categories, toggleIsSelected } = useCategoriesStore();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField] = getQueryParam('filter');

	useEffect(() => {
		const selectedCategories = categories.filter(cat => cat.is_selected);
		if (selectedCategories.length > 0) {
			const selectedCategoryTitles = selectedCategories.map(cat => cat.category_title).join(',');
			updateSearchParams('filter', `categories:${selectedCategoryTitles}`);
		} else {
			if (filterField === 'categories') {
				updateSearchParams('filter', null);
			}
		}
	});

	const applyCategoriesFilter = async () => {
		const selectedCategoryTitles = categories
			.filter(cat => cat.is_selected)
			.map(cat => cat.category_title)
			.join(',');

		await Promise.all(
			categories.map(async cat => {
				await updateIsSelectedCategoryColors(cat.is_selected, cat.category_title, cat.todo_list_id);
			})
		);
		updateSearchParams('filter', `categories:${selectedCategoryTitles}`);
	};
	return (
		<Menu
			open={isOpen}
			onClose={() => setIsOpen(false)}
			posX={`${filterField ? 'right-6' : '-right-5'}`}
			posXNotch="before:right-6"
			width="w-fit"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Filter by Category</p>
				<Button
					ariaLabel="Apply Filter"
					className="text-xs border border-slate-300"
					onClick={() => applyCategoriesFilter()}
				>
					<p>Apply</p>
				</Button>
			</MenuItem>
			<div className="max-h-[70vh] overflow-hidden overflow-y-auto">
				{categories.map(category => (
					<MenuItem
						key={category.id}
						className="flex items-center justify-between"
						onClick={() => toggleIsSelected(category.id)}
					>
						<div className="flex items-center gap-2">
							<p style={{ color: category.hex_color }}>●</p>
							<p className="text-base">{category.category_title}</p>
						</div>

						<Button ariaLabel="Unselect category" className="hover:bg-slate-300 w-5 h-5">
							<CheckIcon size={16} strokeWidth={2} className={`${category.is_selected ? 'block' : 'hidden'} `} />
						</Button>
					</MenuItem>
				))}
			</div>
		</Menu>
	);
}
