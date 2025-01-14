'use client';

import { Button } from '@/components/ui-shared/Button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import SortMenu from '../ui/SortMenu';
import SortControl from '../ui/SortControl';
import useQueryParams from '@/hooks/useQueryParams';

export default function TodoSort({ todolistId }: { todolistId: number }) {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [sortField] = getQueryParam('sort');

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
