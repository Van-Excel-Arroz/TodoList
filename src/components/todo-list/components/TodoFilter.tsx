'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { Category } from '@/types';
import { CalendarDays, CheckIcon, Filter, Tag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface TodoFilterProps {
	todolistId: number;
	initialCategories: Category[];
}

const DateFilters = ['Today', 'Tomorrow', 'This Week', 'This Month', 'No Due Date'];

export default function TodoFilter({ todolistId, initialCategories }: TodoFilterProps) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
	const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

	const [filter] = useSearchParams().get('filter')?.split(':') || [];
	const [sort, order] = useSearchParams().get('sort')?.split(':') || [];

	const [categories, setCategories] = useState<Category[]>(initialCategories);

	const updateSelect = (id: number) => {
		setCategories(categories.map(cat => (cat.id === id ? { ...cat, is_selected: !cat.is_selected } : cat)));
	};

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
					<Button ariaLabel="Apply Filter" className="text-xs border border-slate-300">
						<p>Apply</p>
					</Button>
				</MenuItem>
				<div className="max-h-[70vh] overflow-hidden overflow-y-auto">
					{categories.map(category => (
						<MenuItem
							key={category.id}
							className="flex items-center justify-between"
							onClick={() => updateSelect(category.id)}
						>
							<div className="flex items-center gap-2">
								<p style={{ color: category.hex_color }}>●</p>
								<p className="text-base">{category.category_title}</p>
							</div>

							<Button ariaLabel="Unselect category" className="hover:bg-slate-300 w-5 h-5">
								<CheckIcon size={16} strokeWidth={2} className={`${category.is_selected ? 'block' : 'hidden'} `} />
							</Button>
						</MenuItem>
					))}
				</div>
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
				{DateFilters.map(label => (
					<MenuItem
						key={label}
						className="flex items-center justify-between w-full"
						href={`/tasks/?id=${todolistId}${sort ? `&sort=${sort}%3A${order}` : ''}&filter=${label}`}
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
