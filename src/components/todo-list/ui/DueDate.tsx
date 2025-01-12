import { format, formatDistanceToNow, isPast, isThisYear, isToday, isTomorrow } from 'date-fns';
import { Calendar, Clock3 } from 'lucide-react';

interface DueDateProps {
	dueDatetime: string;
	textSize?: string;
}

export default function DueDate({ dueDatetime, textSize = 'xs' }: DueDateProps) {
	const textStyle = `text-${textSize} ${dueDatetime && isPast(dueDatetime) ? 'text-red-500' : 'text-slate-800'}`;

	return (
		<div className="flex items-center gap-1">
			{/* <Calendar size={12} className="text-slate-800" />
			<p className={textStyle}>
				{dueDatetime
					? isToday(dueDatetime)
						? 'Today' + format(dueDatetime, ` \'at\'`)
						: isTomorrow(dueDatetime)
						? 'Tomorrow' + format(dueDatetime, ` \'at\'`)
						: isThisYear(dueDatetime)
						? format(dueDatetime, `EEE, MMMM d \'at\'`)
						: format(dueDatetime, `EEE, MMMM d yyyy \'at\'`)
					: '-'}
			</p> */}
			<Clock3 size={12} className="text-slate-800" />
			{/* <p className={textStyle}>{dueDatetime ? format(dueDatetime, 'h:mm a') : ''}</p> */}
			<p className={textStyle}>{!isPast(dueDatetime) ? `${formatDistanceToNow(dueDatetime)} Left` : 'Past Due'} </p>
		</div>
	);
}
