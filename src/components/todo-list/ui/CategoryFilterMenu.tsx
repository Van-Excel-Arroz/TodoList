import Button from '@/components/ui-shared/Button';
import CategorySelectionList from '@/components/ui-shared/CategorySelectionList';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { useState } from 'react';

export default function CategoryFilterMenu() {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');
	const [filterField, filterValue] = getQueryParam('filter');
	const initialCategories = filterField === 'Categories' ? filterValue.split(',') ?? [] : [];
	const [selectedCategoryTitles, setSelectedCategoryTitles] = useState<string[]>(initialCategories);

	const applyCategoriesFilter = () => {
		if (selectedCategoryTitles.length === 0) {
			updateSearchParams('filter', null, todolistId || smart_list);
			return;
		}
		const stringTitles = selectedCategoryTitles.join(',');

		if (stringTitles) updateSearchParams('filter', `Categories:${stringTitles}`, todolistId || smart_list);
	};

	return (
		<>
			<CategorySelectionList
				selectedCategoryTitles={selectedCategoryTitles}
				setSelectedCategoryTitles={setSelectedCategoryTitles}
			/>
			<MenuItem className="border-t font-bold justify-end" clickable={false}>
				<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
					<p className="px-1 text-md">Apply</p>
				</Button>
			</MenuItem>
		</>
	);
}
