'use client';

import { Button } from '@/components/ui/Button';
import { Filter } from 'lucide-react';

export default function TodoFilter() {
	return (
		<>
			<div className="text-xs 2xl:text-sm flex items-center gap-2 mr-4">
				<Button ariaLabel="Filter">
					<Filter size={20} className="text-slate-600" />
				</Button>
			</div>
		</>
	);
}
