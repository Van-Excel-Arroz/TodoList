'use client';

import { Button } from '@/components/ui-shared/Button';
import { ChevronDown, Star } from 'lucide-react';

export default function SmartTodolistContainer() {
	return (
		<>
			<div className="flex flex-col items-start gap-2">
				<div className="flex items-center w-full mx-auto">
					<Button ariaLabel="Toggle Show List Container">
						<ChevronDown size={20} />
					</Button>
					<p className="mr-2">Smart Lists</p> <hr className="border border-slate-200 w-full" />
				</div>
				<div className="py-1">
					<Star size={20} />
				</div>
			</div>
		</>
	);
}
