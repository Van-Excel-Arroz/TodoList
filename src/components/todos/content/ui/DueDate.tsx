import { format, isPast, isThisYear, isToday, isTomorrow } from 'date-fns';

interface DueDateProps {
	dueDatetime: string;
	textSize?: string;
}

export default function DueDate({ dueDatetime, textSize = 'xs' }: DueDateProps) {
	return (
		<p className={`text-${textSize} ${dueDatetime && isPast(dueDatetime) ? 'text-red-500' : 'text-slate-800'}`}>
			{dueDatetime
				? isToday(dueDatetime)
					? 'Today' + format(dueDatetime, ` \'at\' h:mm a`)
					: isTomorrow(dueDatetime)
					? 'Tomorrow' + format(dueDatetime, ` \'at\' h:mm a`)
					: isThisYear(dueDatetime)
					? format(dueDatetime, `EEE, MMMM d \'at\' h:mm a`)
					: format(dueDatetime, `EEE, MMMM d yyyy \'at\' h:mm a`)
				: '-'}
		</p>
	);
}
