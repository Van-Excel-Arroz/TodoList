import { formatDistanceToNow, isPast } from 'date-fns';
import { Clock3, ClockAlert } from 'lucide-react';

interface DueDateProps {
	dueDatetime: string;
}

export default function DueDate({ dueDatetime }: DueDateProps) {
	const isDueDatePast: boolean = isPast(dueDatetime);
	const textStyle = `text-xs ${dueDatetime && isDueDatePast ? 'text-red-700' : 'text-slate-600'}`;

	return (
		<div className="flex items-center gap-1">
			{isDueDatePast ? (
				<ClockAlert size={14} className="text-slate-800" />
			) : (
				<Clock3 size={14} className="text-slate-800" />
			)}
			<p className={textStyle}>{!isDueDatePast ? `${formatDistanceToNow(dueDatetime)} Left` : `Past due`}</p>
		</div>
	);
}
