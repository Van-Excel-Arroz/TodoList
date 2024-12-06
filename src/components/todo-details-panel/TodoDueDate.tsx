'use client';

import { Calendar } from 'lucide-react';
import { DueDate } from '@/components/todos/TodoItem';

export default function TodoDueDate({ dueDatetime }: { dueDatetime: string }) {
	return (
		<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<Calendar size={20} className="text-slate-800" />
			<div className="flex flex-col justify-start">
				<p className="text-sm text-slate-600">Due</p>
				{dueDatetime ? (
					<DueDate dueDatetime={dueDatetime ?? ''} textSize="base" />
				) : (
					<p className="text-slate-600">MM/DD/YYYY</p>
				)}
			</div>
		</div>
	);
}
