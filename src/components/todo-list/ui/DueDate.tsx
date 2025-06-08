import { format, formatDistanceToNow, isPast } from 'date-fns';

interface DueDateProps {
	dueDatetime: string;
	dueDateFormat: string;
}

const DUE_DATE_FORMAT_RELATIVE = 'Relative (2 days left, yesterday)';
const DUE_DATE_FORMAT_SHORT = 'Short Date (mm/dd/yyyy)';
const DUE_DATE_FORMAT_LONG = 'Long Date (Jan 1, 2025)';

export default function DueDate({ dueDatetime, dueDateFormat }: DueDateProps) {
	const isDueDatePast: boolean = isPast(dueDatetime);
	const textStyle = `text-xs text-center ${dueDatetime && isDueDatePast ? 'text-red-700' : 'text-slate-600'}`;
	let formattedDateString: string;

	switch (dueDateFormat) {
		case DUE_DATE_FORMAT_RELATIVE:
			formattedDateString = formatDistanceToNow(dueDatetime);
			break;
		case DUE_DATE_FORMAT_SHORT:
			formattedDateString = format(dueDatetime, 'MM/dd/yyyy');
			if (isDueDatePast) {
				formattedDateString += ' (Past)';
			}
			break;
		case DUE_DATE_FORMAT_LONG:
			formattedDateString = format(dueDatetime, 'MMM d, yyyy');
			if (isDueDatePast) {
				formattedDateString += ' (Past)';
			}
			break;
		default:
			console.warn(`Unknown dueDateFormat: ${dueDateFormat}. Defaulting to relative.`);
			if (isDueDatePast) {
				formattedDateString = `Past due by ${formatDistanceToNow(dueDatetime)}`;
			} else {
				formattedDateString = `${formatDistanceToNow(dueDatetime)} left`;
			}
			break;
	}

	return (
		<div className="flex items-center gap-1">
			<p className={textStyle}>{formattedDateString}</p>
		</div>
	);
}
