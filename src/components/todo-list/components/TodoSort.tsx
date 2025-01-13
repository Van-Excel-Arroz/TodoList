'use client';

import { Button } from '@/components/ui-shared/Button';
import { ArrowUpDown, CalendarDays, CalendarPlus, CaseSensitive, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TodoControls from './TodoControls';

export default function TodoSort() {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

	return (
		<div className="flex items-center gap-2">
			<div className="relative">
				<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
					<ArrowUpDown size={20} className="text-slate-600" />
				</Button>
			</div>
			<TodoControls />
		</div>
	);
}
