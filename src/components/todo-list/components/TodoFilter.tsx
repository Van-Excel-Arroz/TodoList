'use client';

import { Button } from '@/components/ui-shared/Button';
import { Category } from '@/types';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import CategoryFilterMenu from '../ui/CategoryFilterMenu';
import DateFilterMenu from '../ui/DateFilterMenu';
import FilterMenu from '../ui/FilterMenu';
import FilterControl from '../ui/FilterControl';
import { useQueryParam } from '@/hooks/useQueryParam';

export default function TodoFilter({ initialCategories }: { initialCategories: Category[] }) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
	const queryParam = useQueryParam();
	const [filterField] = queryParam('sort');

	return (
		<div className="relative">
			{filterField ? (
				<FilterControl setIsCategoryFilterOpen={setIsCategoryFilterOpen} setIsDateFilterOpen={setIsDateFilterOpen} />
			) : (
				<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
					<Filter size={20} className="text-slate-600" />
				</Button>
			)}
			<FilterMenu
				isOpen={isFilterMenuOpen}
				setIsOpen={setIsFilterMenuOpen}
				setIsCategoryFilterOpen={setIsCategoryFilterOpen}
				setIsDateFilterOpen={setIsDateFilterOpen}
			/>
			<CategoryFilterMenu
				initialCategories={initialCategories}
				isOpen={isCategoryFilterOpen}
				setIsOpen={setIsCategoryFilterOpen}
			/>
			<DateFilterMenu isOpen={isDateFilterOpen} setIsOpen={setIsDateFilterOpen} />
		</div>
	);
}
