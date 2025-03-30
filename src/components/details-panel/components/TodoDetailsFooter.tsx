import { format } from 'date-fns';

export default function TodoDetailsFooter({ creationDate }: { creationDate: string }) {
	if (!creationDate) return null;

	return (
		<div className="py-5 px-6 border-t border-slate-300">
			<p className="text-xs text-slate-600">Created: {format(creationDate, 'MMM dd, yyyy')} </p>
		</div>
	);
}
