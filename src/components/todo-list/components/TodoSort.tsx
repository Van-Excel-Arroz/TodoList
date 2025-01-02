'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowUpDown, CalendarDays, Tag } from 'lucide-react';
import { useState } from 'react';

export default function TodoSort() {
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
				<MenuItem>
					<Tag className="text-slate-600" size={18} />
					<p>Categories</p>
				</MenuItem>
				<MenuItem>
					<CalendarDays className="text-slate-600" size={18} />
					<p>Due Date</p>
				</MenuItem>
			</Menu>
		</div>
	);
}
