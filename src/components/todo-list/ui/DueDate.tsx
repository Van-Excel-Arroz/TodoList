import { formatDistanceToNow, isPast } from 'date-fns';
import { Clock3 } from 'lucide-react';

interface DueDateProps {
	dueDatetime: string;
	textSize?: string;
}

export default function DueDate({ dueDatetime, textSize = 'xs' }: DueDateProps) {
	const textStyle = `text-${textSize} ${dueDatetime && isPast(dueDatetime) ? 'text-red-700' : 'text-slate-800'}`;

	return (
		<div className="flex items-center gap-1">
			<Clock3 size={12} className="text-slate-800" />
			<p className={textStyle}>{!isPast(dueDatetime) ? `${formatDistanceToNow(dueDatetime)} Left` : `Past due`}</p>
		</div>
	);
}
