'use client';

import { Button } from '@/components/ui-shared/Button';
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
			<div className="flex items-center pt-1">
				<p className="text-md text-slate-700 pr-2 border-b-2 border-white">Filter by:</p>

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
				<CategoryFilterMenu isOpen={isCategoryFilterOpen} setIsOpen={setIsCategoryFilterOpen} />
				<DateFilterMenu isOpen={isDateFilterOpen} setIsOpen={setIsDateFilterOpen} />
			</div>
		</div>
	);
}
