import { deleteTodoAction } from '@/actions/todolist-action';
import useRightSidebarStore from '@/context/RightSidebarContext';
import useTodoStore from '@/context/todoContext';
import { Trash2 } from 'lucide-react';

interface RightSidebarFooterProps {
	creationDate: string;
	todoId: number;
	todolistId: number;
}

export default function RightSidebarFooter({ creationDate, todoId, todolistId }: RightSidebarFooterProps) {
	const { closeRightSidebar } = useRightSidebarStore();
	const { setSelectedTodo } = useTodoStore();

	const handleDeleteClick = async () => {
		await deleteTodoAction(todoId, todolistId);
		closeRightSidebar();
		setSelectedTodo(null);
	};

	return (
		<div className="absolute border-t-2 border-slate-200 bottom-0 left-0 w-full h-20 pr-6 pl-4 bg-slate-100 flex items-center justify-between">
			{creationDate && (
				<p className="text-sm text-slate-600">Created at: {new Date(creationDate).toLocaleDateString()} </p>
			)}
			<button
				className="p-1 rounded-md hover:bg-slate-200 active:bg-slate-200 text-slate-600"
				onClick={handleDeleteClick}
			>
				<Trash2 />
			</button>
		</div>
	);
}
