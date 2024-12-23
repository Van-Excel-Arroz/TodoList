import { format } from 'date-fns';

interface RightSidebarFooterProps {
	creationDate: string;
}

export default function TodoDetailsFooter({ creationDate }: RightSidebarFooterProps) {
	if (!creationDate) return null;
	return (
		<div className="sticky bottom-0 py-5 border-t border-slate-300  bg-white  w-full  flex items-center justify-between">
			<div className="flex items-center justify-between text-xs text-slate-600 w-full">
				<p>Created: {format(creationDate, 'MMM dd, yyyy')} </p>
				<p>Updated: {format(creationDate, 'MMM dd, yyyy')}</p>
			</div>
		</div>
	);
}
