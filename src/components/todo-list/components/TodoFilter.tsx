'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { CalendarDays, Filter, Tag } from 'lucide-react';
import { useState } from 'react';

export default function TodoFilter({ todolistId }: { todolistId: number }) {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [isCategoryMenyOpen, setIsCategoryMenuOpen] = useState(false);

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
					<p>Add Filter</p>
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
