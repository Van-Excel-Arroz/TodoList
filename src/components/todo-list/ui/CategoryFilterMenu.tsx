import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useCategoriesStore from '@/context/CategoriesContext';
import useQueryParams from '@/hooks/useQueryParams';
import { MenuOpenProps } from '@/utils/types';
import { CheckIcon } from 'lucide-react';

export default function CategoryFilterMenu({ isOpen, setIsOpen }: MenuOpenProps) {
	const { categories, toggleIsSelected } = useCategoriesStore();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField] = getQueryParam('filter');
	const [todolistId] = getQueryParam('id');

	const applyCategoriesFilter = () => {
		const selectedCategoryTitles = categories
			.filter(cat => cat.is_selected)
			.map(cat => cat.category_title)
			.join(',');

		if (selectedCategoryTitles) updateSearchParams('filter', `categories:${selectedCategoryTitles}`, todolistId);
	};
	return (
		<Menu
			open={isOpen}
			onClose={() => setIsOpen(false)}
			posX={`${filterField ? 'right-6' : '-right-3'}`}
			posXNotch="before:right-6"
			width="w-fit"
		>
			<MenuItem className="border-b font-bold justify-center" clickable={false}>
				<p>Filter by Category</p>
				<Button
					ariaLabel="Apply Filter"
					className="text-xs border border-slate-300"
					onClick={() => applyCategoriesFilter()}
				>
					<p>Apply</p>
				</Button>
			</MenuItem>
			<div className="max-h-[60vh] overflow-hidden overflow-y-auto">
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
