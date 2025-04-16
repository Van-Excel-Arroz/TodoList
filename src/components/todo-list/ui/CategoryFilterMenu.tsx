import Button from '@/components/ui-shared/Button';
import CategorySelectionList from '@/components/ui-shared/CategorySelectionList';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { useState } from 'react';

export default function CategoryFilterMenu() {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');
	const [filterField, fitlerValue] = getQueryParam('filter');
	const initialCategories = filterField === 'categories' ? fitlerValue.split(',') ?? [] : [];
	const [selectedCategoryTitles, setSelectedCategoryTitles] = useState<string[]>(initialCategories);

	const applyCategoriesFilter = () => {
		if (selectedCategoryTitles.length === 0) return;
		const stringTitles = selectedCategoryTitles.join(',');

		if (stringTitles) updateSearchParams('filter', `categories:${stringTitles}`, todolistId || smart_list);
	};

	return (
		<>
			<CategorySelectionList
				selectedCategoryTitles={selectedCategoryTitles}
				setSelectedCategoryTitles={setSelectedCategoryTitles}
			/>
			<MenuItem className="border-t font-bold gap-2 justify-end" clickable={false}>
				<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
					<p className="px-1 text-sm">Apply</p>
				</Button>
			</MenuItem>
		</>
	);
}
