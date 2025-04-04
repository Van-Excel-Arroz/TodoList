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
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');

	const applyCategoriesFilter = () => {
		const selectedCategoryTitles = categories.map(cat => cat.category_title).join(',');

		if (selectedCategoryTitles)
			updateSearchParams('filter', `categories:${selectedCategoryTitles}`, todolistId || smart_list);
	};
	return (
		<Menu open={isOpen} onClose={() => setIsOpen(false)} width="w-fit">
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
							<CheckIcon size={16} strokeWidth={2} />
						</Button>
					</MenuItem>
				))}
			</div>
		</Menu>
	);
}
