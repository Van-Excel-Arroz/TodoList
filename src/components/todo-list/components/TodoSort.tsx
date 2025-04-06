'use client';

import Button from '@/components/ui-shared/Button';
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
			<div className="flex items-center py-1 pl-4 pr-2 outline outline-1 outline-slate-300 rounded-md hover:outline-slate-400 focus-within:!outline-1  focus-within:!outline-slate-600">
				<p className="text-sm text-slate-600 pr-2">Sort by: </p>

				{sortField ? (
					<SortControl setIsSortMenuOpen={setIsSortMenuOpen} />
				) : (
					<Button ariaLabel="Filter" onClick={() => setIsSortMenuOpen(prev => !prev)}>
						<ArrowUpDown size={18} className="text-slate-600" />
					</Button>
				)}
				<SortMenu isSortMenuOpen={isSortMenuOpen} setIsSortMenuOpen={setIsSortMenuOpen} width="w-52" />
			</div>
		</div>
	);
}
