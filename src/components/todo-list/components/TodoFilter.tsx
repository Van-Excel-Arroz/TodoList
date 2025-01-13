'use client';

import { Button } from '@/components/ui-shared/Button';
import { Category } from '@/types';
import { CalendarDays, Filter, Tag, XIcon } from 'lucide-react';
import { useState } from 'react';
import CategoryFilterMenu from '../ui/CategoryFilterMenu';
import DateFilterMenu from '../ui/DateFilterMenu';
import FilterMenu from '../ui/FilterMenu';
import { useSearchParams } from 'next/navigation';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import FilterControl from '../ui/FilterControl';

export default function TodoFilter({ initialCategories }: { initialCategories: Category[] }) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

	const searchParams = useSearchParams();
	const [filterField, filterValue] = searchParams.get('filter')?.split(':') || [];

	return (
		<div className="relative">
			{filterField ? (
				<FilterControl setIsCategoryFilterOpen={setIsCategoryFilterOpen} setIsDateFilterOpen={setIsDateFilterOpen} />
			) : (
				<>
					<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
						<Filter size={20} className="text-slate-600" />
					</Button>
				</>
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
