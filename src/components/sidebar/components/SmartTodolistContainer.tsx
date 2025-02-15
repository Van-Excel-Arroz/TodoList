'use client';

import { Button } from '@/components/ui-shared/Button';
import { Calendar, ChevronDown, Clock3, Star, Tags } from 'lucide-react';

export default function SmartTodolistContainer() {
	return (
		<div className="flex flex-col items-start gap-1">
			<div className="flex items-center w-full mx-auto">
				<Button ariaLabel="Toggle Show List Container">
					<ChevronDown size={20} />
				</Button>
				<p className="mr-2 text-slate-600">Smart Lists</p> <hr className="border border-slate-200 w-full" />
			</div>
			<div className="flex items-center gap-2 py-1 px-2">
				<Star className="text-slate-600" size={20} />
				<p>Priority</p>
			</div>
			<div className="flex items-center gap-2 py-1 px-2">
				<Calendar className="text-slate-600" size={20} />
				<p>Today</p>
			</div>
			<div className="flex items-center gap-2 py-1 px-2">
				<Clock3 className="text-slate-600" size={20} />
				<p>Upcoming</p>
			</div>
			<div className="flex items-center gap-2 py-1 px-2">
				<Tags className="text-slate-600" size={20} />
				<p>Tagged</p>
			</div>
		</div>
	);
}
