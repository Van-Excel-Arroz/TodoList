'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { Category } from '@/types';
import { CalendarDays, CheckIcon, Filter, Tag } from 'lucide-react';
import { useState } from 'react';

interface TodoFilterProps {
	todolistId: number;
	categories: Category[];
}

const DateFilters = ['Today', 'Tomorrow', 'This Week', 'This Month', 'No Due Date'];

export default function TodoFilter({ todolistId, categories }: TodoFilterProps) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

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
			<Menu
				open={isCategoryFilterOpen}
				onClose={() => setIsCategoryFilterOpen(false)}
				posX="-right-5"
				posXNotch="before:right-6"
				width="w-fit"
			>
				<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
					<p>Filter by Category</p>
				</MenuItem>
				{categories.map(category => (
					<MenuItem key={category.id} className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<p style={{ color: category.hex_color }}>●</p>
							<p className="text-base">{category.category_title}</p>
						</div>
						<div className="h-5 w-5">
							<CheckIcon size={14} className={`${category.is_selected ? 'block' : 'hidden'} `} />
						</div>
					</MenuItem>
				))}
			</Menu>
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
				{DateFilters.map(filter => (
					<div key={filter} className="flex items-center justify-between py-1 px-2 hover:bg-slate-200 cursor-pointer">
						<p className="text-base">{filter}</p>
						<CheckIcon size={14} />
					</div>
				))}
			</Menu>
		</div>
	);
}
