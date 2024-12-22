'use client';

import { deleteTodoAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useTodosStore from '@/context/TodosContext';
import { ArrowBigRightDashIcon, Trash2 } from 'lucide-react';

export default function TodoDetailsHeader({ todoId }: { todoId: number }) {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { setSelectedTodo } = useSelectedTodoStore();
	const { deleteTodo } = useTodosStore();

	const handleCloseRightSidebar = () => {
		closeTodoDetailsPanel();
		setSelectedTodo(null);
	};

	const handleDeleteClick = async () => {
		await deleteTodoAction(todoId);
		deleteTodo(todoId);
		closeTodoDetailsPanel();
		setSelectedTodo(null);
	};
	return (
		<div className="flex items-center justify-between py-6 border-b border-slate-300">
			<Button onClick={handleCloseRightSidebar} ariaLabel="Close Todo Menu">
				<ArrowBigRightDashIcon size={22} />
			</Button>
			<p className="flex-1 text-xl font-medium text-center px-6">Details</p>
			<Button onClick={handleDeleteClick} ariaLabel="Delete Todo">
				<Trash2 size={18} />
			</Button>
		</div>
	);
}
