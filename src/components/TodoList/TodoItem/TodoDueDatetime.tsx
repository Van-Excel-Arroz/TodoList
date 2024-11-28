'use client';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { Calendar } from 'lucide-react';
import { memo } from 'react';

function TodoDueDatetime({ dueDatetime }: { dueDatetime: string | null }) {
	return (
		<div className="flex items-center gap-2">
			<p className="text-xs text-slate-800">
				<Calendar size={12} />
			</p>
			<p className={`text-xs ${dueDatetime && isPast(dueDatetime) ? 'text-red-500' : 'text-slate-800'}`}>
				{dueDatetime
					? isToday(dueDatetime)
						? 'Today' + format(dueDatetime, ` \'at\' h:mm a`)
						: isTomorrow(dueDatetime)
						? 'Tomorrow' + format(dueDatetime, ` \'at\' h:mm a`)
						: format(dueDatetime, `EEE, MMMM d \'at\' h:mm a`)
					: '-'}
			</p>
		</div>
	);
}

export default memo(TodoDueDatetime);
