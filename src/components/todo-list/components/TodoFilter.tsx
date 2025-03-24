'use client';

import Button from '@/components/ui-shared/Button';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import CategoryFilterMenu from '../ui/CategoryFilterMenu';
import DateFilterMenu from '../ui/DateFilterMenu';
import FilterMenu from '../ui/FilterMenu';
import FilterControl from '../ui/FilterControl';
import useQueryParams from '@/hooks/useQueryParams';

export default function TodoFilter() {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [filterField] = getQueryParam('filter');

	return (
		<div className="relative">
			<div className="flex items-center py-1 pl-4 pr-2 outline outline-1 outline-slate-300 rounded-md">
				<p className="text-sm text-slate-600 pr-2">Filter by:</p>

				{filterField ? (
					<FilterControl setIsCategoryFilterOpen={setIsCategoryFilterOpen} setIsDateFilterOpen={setIsDateFilterOpen} />
				) : (
					<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
						<Filter size={18} className="text-slate-600" />
					</Button>
				)}
				<FilterMenu
					isOpen={isFilterMenuOpen}
					setIsOpen={setIsFilterMenuOpen}
					setIsCategoryFilterOpen={setIsCategoryFilterOpen}
					setIsDateFilterOpen={setIsDateFilterOpen}
				/>
				<CategoryFilterMenu isOpen={isCategoryFilterOpen} setIsOpen={setIsCategoryFilterOpen} />
				<DateFilterMenu isOpen={isDateFilterOpen} setIsOpen={setIsDateFilterOpen} />
			</div>
		</div>
	);
}
