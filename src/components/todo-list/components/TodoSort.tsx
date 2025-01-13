'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowUpDown, CalendarDays, CalendarPlus, CaseSensitive, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TodoControls from './TodoControls';

const MenuItems = {
	'Due Date': {
		param: 'dueDate%3Aasc',
		icon: CalendarDays,
	},
	'Creation Date': {
		param: 'creationDate%3Aasc',
		icon: CalendarPlus,
	},
	Importance: {
		param: 'importance%3Aasc',
		icon: Star,
	},
	Alphabetical: {
		param: 'alphabetical%3Aasc',
		icon: CaseSensitive,
	},
};

export default function TodoSort({ todolistId }: { todolistId: number }) {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const [filterField, filterValue] = useSearchParams().get('filter')?.split(':') || [];

	return (
		<div className="flex items-center gap-2">
			<div className="relative">
				<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
					<ArrowUpDown size={20} className="text-slate-600" />
				</Button>
				<Menu
					open={isSortMenuOpen}
					onClose={() => setIsSortMenuOpen(false)}
					posX="-right-5"
					posXNotch="before:right-6"
					width="w-44"
				>
					<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
						<p>Sort by</p>
					</MenuItem>

					{Object.entries(MenuItems).map(([label, menuItem]) => (
						<MenuItem
							href={`/tasks/?id=${todolistId}&sort=${menuItem.param}${
								filterField ? `&filter=${filterField}:${filterValue}` : ''
							}`}
							key={label}
						>
							<menuItem.icon className="text-slate-600" size={18} />
							<p>{label}</p>
						</MenuItem>
					))}
				</Menu>
			</div>
			<TodoControls />
		</div>
	);
}
