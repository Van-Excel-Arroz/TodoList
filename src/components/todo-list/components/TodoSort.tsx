'use client';

import { Button } from '@/components/ui-shared/Button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import SortMenu from '../ui/SortMenu';
import SortControl from '../ui/SortControl';
import useQueryParams from '@/hooks/useQueryParams';

export default function TodoSort() {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [sortField] = getQueryParam('sort');

	return (
		<div className="relative">
			<div className="flex items-center">
				<p className="text-sm text-slate-700 pr-2">Sort by: </p>

				{sortField ? (
					<SortControl setIsSortMenuOpen={setIsSortMenuOpen} />
				) : (
					<div className="flex items-center">
						<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
							<ArrowUpDown size={20} className="text-slate-600" />
						</Button>
					</div>
				)}
				<SortMenu isSortMenuOpen={isSortMenuOpen} setIsSortMenuOpen={setIsSortMenuOpen} />
			</div>
		</div>
	);
}
