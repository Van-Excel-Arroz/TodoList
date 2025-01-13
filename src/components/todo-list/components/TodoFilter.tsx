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

const filterIcons: any = {
	dueDate: CalendarDays,
	categories: Tag,
};

export default function TodoFilter({ initialCategories }: { initialCategories: Category[] }) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

	filterIcons.dueDate.menuOpen = setIsDateFilterOpen;
	filterIcons.categories.menuOpen = setIsCategoryFilterOpen;

	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const [filterField, filterValue] = searchParams.get('filter')?.split(':') || [];
	const Icon = filterIcons[filterField] ?? Filter;

	const getMenuOpener = (field: string) => {
		if (field === 'dueDate') return setIsDateFilterOpen;
		if (field === 'categories') return setIsCategoryFilterOpen;
	};

	const handleMenuToggle = () => {
		const menuOpener = getMenuOpener(filterField);
		if (menuOpener) menuOpener(prev => !prev);
	};

	return (
		<div className="relative">
			{filterField ? (
				<div className="flex items-center text-xs gap-1 p-1 bg-slate-200 text-slate-700 rounded-lg border border-slate-300 hover:border-slate-400">
					<p className=" pl-1">Filter by:</p>
					<Button
						ariaLabel="Change Filter"
						onClick={handleMenuToggle}
						className="flex items-center gap-1 hover:bg-slate-300 active:bg-slate-400"
					>
						<Icon size={12} />
						<p>{filterField === 'categories' ? 'Category' : filterValue}</p>
					</Button>
					<Button
						ariaLabel="Remove Sort"
						onClick={() => updateSearchParams('filter', null)}
						className="hover:bg-slate-300 active:bg-slate-400"
					>
						<XIcon size={12} />
					</Button>
				</div>
			) : (
				<>
					<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
						<Filter size={20} className="text-slate-600" />
					</Button>
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
				</>
			)}
		</div>
	);
}
