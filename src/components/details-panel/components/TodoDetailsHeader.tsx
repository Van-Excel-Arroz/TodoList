'use client';

import { deleteTodoAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { PanelRightClose, Trash2 } from 'lucide-react';

export default function TodoDetailsHeader() {
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { deleteTodo } = useTodosStore();

	const handleCloseRightSidebar = () => {
		setSelectedTodoId(0);
	};

	const handleDelete = async () => {
		await deleteTodoAction(selectedTodoId);
		deleteTodo(selectedTodoId);
		setSelectedTodoId(0);
	};
	return (
		<div className="flex items-center justify-between py-6 border-b border-slate-300 sticky top-0 bg-white">
			<Button onClick={handleCloseRightSidebar} ariaLabel="Close Todo Menu">
				<PanelRightClose size={25} />
			</Button>
			<p className="flex-1 text-xl font-medium text-center px-6">Task Details</p>
			<Button onClick={handleDelete} ariaLabel="Delete Todo" className="text-red-900">
				<Trash2 size={20} />
			</Button>
		</div>
	);
}
