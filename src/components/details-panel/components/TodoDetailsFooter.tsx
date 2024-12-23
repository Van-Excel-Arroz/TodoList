import { format } from 'date-fns';

interface RightSidebarFooterProps {
	creationDate: string;
}

export default function TodoDetailsFooter({ creationDate }: RightSidebarFooterProps) {
	if (!creationDate) return null;
	return (
		<div className="absolute bottom-5 border-t border-slate-300 w-10/12 pt-4  flex items-center justify-between">
			<div className="flex items-center justify-between text-xs text-slate-600 w-full">
				<p>Created: {format(creationDate, 'MMM dd, yyyy')} </p>
				<p>Updated: {format(creationDate, 'MMM dd, yyyy')}</p>
			</div>
		</div>
	);
}
