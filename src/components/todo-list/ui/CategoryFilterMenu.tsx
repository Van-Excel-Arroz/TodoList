import Button from '@/components/ui-shared/Button';
import MenuItem from '@/components/ui-shared/MenuItem';
import useCategoriesStore from '@/context/CategoriesContext';
import useQueryParams from '@/hooks/useQueryParams';
import { Category } from '@/utils/types';
import { Check } from 'lucide-react';
import { useState } from 'react';

export default function CategoryFilterMenu() {
	const { categories } = useCategoriesStore();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');

	const applyCategoriesFilter = () => {
		if (selectedCategories.length === 0) return;
		const selectedCategoryTitles = selectedCategories.map(cat => cat.category_title).join(',');

		if (selectedCategoryTitles)
			updateSearchParams('filter', `categories:${selectedCategoryTitles}`, todolistId || smart_list);
	};

	const handleCategoryClick = (category: Category) => {
		const isSelected = selectedCategories.find(cat => cat.id === category.id);

		if (isSelected) {
			setSelectedCategories(cats => cats.filter(cat => cat.id !== category.id));
		} else {
			setSelectedCategories(cats => [...cats, category]);
		}
	};

	return (
		<>
			<div className="max-h-[30vh] overflow-hidden overflow-y-auto">
				{categories.length > 0 ? (
					categories.map(category => (
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
					<p className="py-6 px-3 text-slate-600">No available categories.</p>
				)}
			</div>
			<MenuItem className="border-t font-bold gap-2 justify-end" clickable={false}>
				<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
					<p className="px-1 text-sm">Apply</p>
				</Button>
			</MenuItem>
		</>
	);
}
