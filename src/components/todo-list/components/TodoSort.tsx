'use client';

import { Button } from '@/components/ui-shared/Button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import SortMenu from '../ui/SortMenu';
import { useSearchParams } from 'next/navigation';
import SortControl from '../ui/SortControl';

export default function TodoSort({ todolistId }: { todolistId: number }) {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const searchParams = useSearchParams();
	const [sortField] = searchParams.get('sort')?.split(':') ?? [];

	return (
		<div className="relative">
			{sortField ? (
				<SortControl setIsSortMenuOpen={setIsSortMenuOpen} />
			) : (
				<div className="relative">
					<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
						<ArrowUpDown size={20} className="text-slate-600" />
					</Button>
				</div>
			)}
			<SortMenu isSortMenuOpen={isSortMenuOpen} setIsSortMenuOpen={setIsSortMenuOpen} todolistId={todolistId} />
		</div>
	);
}
