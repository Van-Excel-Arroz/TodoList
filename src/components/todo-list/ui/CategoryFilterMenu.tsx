import Button from '@/components/ui-shared/Button';
import CategorySelectionList from '@/components/ui-shared/CategorySelectionList';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { Category } from '@/utils/types';
import { useState } from 'react';

export default function CategoryFilterMenu() {
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

	return (
		<>
			<CategorySelectionList selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
			<MenuItem className="border-t font-bold gap-2 justify-end" clickable={false}>
				<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
					<p className="px-1 text-sm">Apply</p>
				</Button>
			</MenuItem>
		</>
	);
}
