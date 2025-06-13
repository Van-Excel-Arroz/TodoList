'use client';

import Button from '@/components/ui-shared/Button';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import FilterControl from '../ui/FilterControl';
import useQueryParams from '@/hooks/useQueryParams';
import dynamic from 'next/dynamic';
const FilterMenu = dynamic(() => import('../ui/FilterMenu'), { ssr: false });

export default function TodoFilter() {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [filterField] = getQueryParam('filter');

	return (
		<div className="relative">
			<div className="flex items-center py-1 pl-4 pr-2 outline outline-1 outline-slate-300 ring-offset-2 ring-slate-400 rounded-md hover:ring-2 focus-within:ring-2">
				<p className="text-sm text-slate-600 pr-2">Filter by:</p>

				{filterField ? (
					<FilterControl setIsFilterMenuOpen={setIsFilterMenuOpen} />
				) : (
					<Button ariaLabel="Filter" onClick={() => setIsFilterMenuOpen(prev => !prev)}>
						<Filter size={18} className="text-slate-600" />
					</Button>
				)}

				<FilterMenu isOpen={isFilterMenuOpen} setIsOpen={setIsFilterMenuOpen} />
			</div>
		</div>
	);
}
