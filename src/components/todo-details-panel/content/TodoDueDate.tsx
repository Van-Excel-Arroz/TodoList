'use client';

import DueDate from '@/components/todos/ui/DueDate';
import { Calendar } from 'lucide-react';

export default function TodoDueDate({ dueDatetime }: { dueDatetime: string }) {
	return (
		<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<div className="flex flex-col justify-start">
				<div className="text-slate-600 flex items-center gap-2 py-1">
					<Calendar size={16} />
					<p className="text-sm">Due</p>
				</div>
				{dueDatetime ? (
					<DueDate dueDatetime={dueDatetime ?? ''} textSize="base" />
				) : (
					<p className="text-slate-600">MM/DD/YYYY</p>
				)}
			</div>
		</div>
	);
}
