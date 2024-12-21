import { deleteTodoAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useTodosStore from '@/context/TodosContext';
import { Trash2 } from 'lucide-react';

interface RightSidebarFooterProps {
	creationDate: string;
	todoId: number;
}

export default function TodoDetailsFooter({ creationDate, todoId }: RightSidebarFooterProps) {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { setSelectedTodo } = useSelectedTodoStore();
	const { deleteTodo } = useTodosStore();

	const handleDeleteClick = async () => {
		await deleteTodoAction(todoId);
		deleteTodo(todoId);
		closeTodoDetailsPanel();
		setSelectedTodo(null);
	};

	return (
		<div className="absolute border-t-2 border-slate-200 bottom-0 left-0 w-full h-14 pr-6 pl-4 bg-slate-100 flex items-center justify-between">
			{creationDate && (
				<p className="text-sm text-slate-600">Created at: {new Date(creationDate).toLocaleDateString()} </p>
			)}
			<Button onClick={handleDeleteClick} ariaLabel="Delete Todo">
				<Trash2 />
			</Button>
		</div>
	);
}
