import { Trash2 } from 'lucide-react';

interface RightSidebarFooterProps {
	createdAt: string;
	todoId: number;
}

export default function RightSidebarFooter({ createdAt, todoId }: RightSidebarFooterProps) {
	return (
		<div className="absolute border-t-2 border-slate-200 bottom-0 left-0 w-full h-20 pr-6 pl-4 bg-slate-100 flex items-center justify-between">
			<p className="text-sm text-slate-600">Created at: </p>
			<button>
				<Trash2 />
			</button>
		</div>
	);
}
