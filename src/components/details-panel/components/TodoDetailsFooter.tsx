import { format } from 'date-fns';

export default function TodoDetailsFooter({ creationDate }: { creationDate: string }) {
	if (!creationDate) return null;

	return (
		<div className="sticky bottom-0 py-5 border-t border-slate-300 w-full flex items-center justify-between bg-white">
			<div className="flex items-center justify-between text-xs text-slate-600 w-full px-6">
				<p>Created: {format(creationDate, 'MMM dd, yyyy')} </p>
			</div>
		</div>
	);
}
