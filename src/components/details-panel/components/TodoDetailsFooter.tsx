import { format } from 'date-fns';

interface RightSidebarFooterProps {
	creationDate: string;
}

export default function TodoDetailsFooter({ creationDate }: RightSidebarFooterProps) {
	return (
		<div className="flex items-center justify-between">
			{creationDate && <p className="text-sm text-slate-600">Created: {format(creationDate, 'MM/dd/yyyy')} </p>}
		</div>
	);
}
