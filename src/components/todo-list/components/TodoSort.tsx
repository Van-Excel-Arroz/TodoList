'use client';

import { Button } from '@/components/ui-shared/Button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import TodoControls from './TodoControls';
import SortMenu from '../ui/SortMenu';

export default function TodoSort({ todolistId }: { todolistId: number }) {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

	return (
		<div className="flex items-center gap-2">
			<div className="relative">
				<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
					<ArrowUpDown size={20} className="text-slate-600" />
					<SortMenu isSortMenuOpen={isSortMenuOpen} setIsSortMenuOpen={setIsSortMenuOpen} todolistId={todolistId} />
				</Button>
			</div>
			<TodoControls />
		</div>
	);
}
