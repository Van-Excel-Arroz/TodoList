'use client';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { memo } from 'react';

function TodoDueDatetime({ dueDatetime }: { dueDatetime: string | null }) {
	return (
		<p
			className={
				dueDatetime && isPast(dueDatetime)
					? 'text-center text-sm flex self-center justify-center text-red-500'
					: 'text-center text-sm flex self-center justify-center text-slate-800'
			}
		>
			{dueDatetime
				? isToday(dueDatetime)
					? 'Today' + format(dueDatetime, ` \'at\' h:mm a`)
					: isTomorrow(dueDatetime)
					? 'Tomorrow' + format(dueDatetime, ` \'at\' h:mm a`)
					: format(dueDatetime, `EEE, MMMM d \'at\' h:mm a`)
				: '-'}
		</p>
	);
}

export default memo(TodoDueDatetime);
