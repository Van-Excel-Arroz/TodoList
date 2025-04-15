import { formatDistanceToNow, isPast } from 'date-fns';

interface DueDateProps {
	dueDatetime: string;
	displayIcon?: boolean;
}

export default function DueDate({ dueDatetime }: DueDateProps) {
	const isDueDatePast: boolean = isPast(dueDatetime);
	const textStyle = `text-xs text-center ${dueDatetime && isDueDatePast ? 'text-red-700' : 'text-slate-600'}`;

	return (
		<div className="flex items-center gap-1">
			<p className={textStyle}>{!isDueDatePast ? `${formatDistanceToNow(dueDatetime)} Left` : `Past due`}</p>
		</div>
	);
}
