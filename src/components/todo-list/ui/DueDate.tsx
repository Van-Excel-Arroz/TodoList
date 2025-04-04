import { formatDistanceToNow, isPast } from 'date-fns';
import { Clock3, ClockAlert } from 'lucide-react';

interface DueDateProps {
	dueDatetime: string;
	displayIcon?: boolean;
}

export default function DueDate({ dueDatetime, displayIcon = true }: DueDateProps) {
	const isDueDatePast: boolean = isPast(dueDatetime);
	const textStyle = `text-xs ${dueDatetime && isDueDatePast ? 'text-red-700' : 'text-slate-600'}`;
	const ClockIcon = isDueDatePast ? ClockAlert : Clock3;

	return (
		<div className="flex items-center gap-1">
			{displayIcon ? <ClockIcon size={14} className="text-slate-800" /> : null}
			<p className={textStyle}>{!isDueDatePast ? `${formatDistanceToNow(dueDatetime)} Left` : `Past due`}</p>
		</div>
	);
}
