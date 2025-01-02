'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import { Filter } from 'lucide-react';
import { useRef } from 'react';

export default function TodoFilter() {
	const FilterMenuRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative flex items-center mr-4">
			<Button ariaLabel="Filter">
				<Filter size={20} className="text-slate-600" />
			</Button>
			<Menu ref={FilterMenuRef} open={true} width={44} rightNotch={6} posRight={5}>
				HELLO WORLD
			</Menu>
		</div>
	);
}
