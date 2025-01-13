'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { Category } from '@/types';
import { CalendarDays, CheckIcon, Filter, Tag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CategoryFilterMenu from '../ui/CategoryFilterMenu';

const DateFilters = ['Today', 'Tomorrow', 'This Week', 'This Month', 'No Due Date'];

export default function TodoFilter({ initialCategories }: { initialCategories: Category[] }) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const [filter] = searchParams.get('filter')?.split(':') || [];

	return (
		<div className="relative">
			<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
				<Filter size={20} className="text-slate-600" />
			</Button>
			<Menu
				open={isFilterMenuOpen}
				onClose={() => setIsFilterMenuOpen(false)}
				posX="-right-5"
				posXNotch="before:right-6"
				width="w-44"
			>
				<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
					<p>Filter by</p>
				</MenuItem>
				<MenuItem
					onClick={() => {
						setIsCategoryFilterOpen(true);
						setIsFilterMenuOpen(false);
					}}
				>
					<Tag className="text-slate-600" size={18} />
					<p>Categories</p>
				</MenuItem>
				<MenuItem
					onClick={() => {
						setIsDateFilterOpen(true);
						setIsFilterMenuOpen(false);
					}}
				>
					<CalendarDays className="text-slate-600" size={18} />
					<p>Due Date</p>
				</MenuItem>
			</Menu>
			<CategoryFilterMenu
				initialCategories={initialCategories}
				isCategoryFilterOpen={isCategoryFilterOpen}
				setIsCategoryFilterOpen={setIsCategoryFilterOpen}
			/>

			<Menu
				open={isDateFilterOpen}
				onClose={() => setIsDateFilterOpen(false)}
				posX="-right-5"
				posXNotch="before:right-6"
				width="w-44"
			>
				<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
					<p>Filter by Date</p>
				</MenuItem>
				{DateFilters.map(label => (
					<MenuItem
						key={label}
						className="flex items-center justify-between w-full"
						onClick={() => updateSearchParams('filter', `dueDate:${label}`)}
					>
						<p className="text-base text-left w-full">{label}</p>
						<div className="h-3 w-3">
							<CheckIcon size={14} className={`${label === filter ? 'block' : 'hidden'}`} />
						</div>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
