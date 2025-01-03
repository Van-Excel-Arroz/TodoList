'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowUpDown, CalendarDays, CalendarPlus, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
				<MenuItem>
					<Link
						href={`/tasks/?id=${todolistId}&sort=dueDate%3Adasc`}
						className="flex items-center justify-center gap-2 w-full"
					>
						<CalendarDays className="text-slate-600" size={18} />
						<p>Due Date</p>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href={`/tasks/?id=${todolistId}&sort=creationDate%3Adesc`}
						className="flex items-center justify-center gap-2 w-full"
					>
						<CalendarPlus className="text-slate-600" size={18} />
						<p>Creation Date</p>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href={`/tasks/?id=${todolistId}&sort=importance%3Aasc`}
						className="flex items-center justify-center gap-2 w-full"
					>
						<Star className="text-slate-600" size={18} />
						<p>Importance</p>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href={`/tasks/?id=${todolistId}&sort=alphabetical%3Aasc`}
						className="flex items-center justify-center gap-2 w-full"
					>
						<p>Alphabetical</p>
					</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
