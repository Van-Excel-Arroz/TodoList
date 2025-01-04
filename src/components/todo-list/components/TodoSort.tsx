'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowUpDown, CalendarDays, CalendarPlus, Star } from 'lucide-react';
import Link from 'next/link';
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
		icon: null,
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
					<MenuItem key={label}>
						<Link
							href={`/tasks/?id=${todolistId}&sort=${menuItem.param}`}
							className="flex items-center justify-center gap-2 w-full"
						>
							{menuItem.icon ? <menuItem.icon className="text-slate-600" size={18} /> : null}
							<p>{label}</p>
						</Link>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
