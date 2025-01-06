'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowUpDown, CalendarDays, CalendarPlus, CaseSensitive, Star } from 'lucide-react';
import { useState } from 'react';

const MenuItems = {
	'Due Date': {
		param: 'dueDate%3Adasc',
		icon: CalendarDays,
	},
	'Creation Date': {
		param: 'creationDate%3Adesc',
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

	return (
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
					<MenuItem href={`/tasks/?id=${todolistId}&sort=${menuItem.param}`} key={label}>
						<menuItem.icon className="text-slate-600" size={18} />
						<p>{label}</p>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
