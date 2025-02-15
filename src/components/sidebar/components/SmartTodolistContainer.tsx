'use client';

import { Button } from '@/components/ui-shared/Button';
import { ChevronDown } from 'lucide-react';

export default function SmartTodolistContainer() {
	return (
		<div className="flex items-center gap-2 mb-2 w-full mx-auto">
			<Button ariaLabel="Toggle Show List Container">
				<ChevronDown size={20} />
			</Button>
			<p className="mr-2">Smart Lists</p> <hr className="border border-slate-200 w-full" />
		</div>
	);
}
