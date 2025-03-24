'use client';

import { deleteTodoAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { PanelRight, Trash2 } from 'lucide-react';

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
		<div className="flex items-center justify-between	py-4 px-6 border-b border-slate-300 sticky top-0 bg-white">
			<p className="flex-1 text-lg font-bold text-slate-700 text-left">Task Details</p>
			<Button onClick={handleDelete} ariaLabel="Delete Todo">
				<Trash2 size={20} className="text-red-600" />
			</Button>
			<Button onClick={handleCloseRightSidebar} ariaLabel="Close Todo Menu" className="pl-4">
				<PanelRight size={22} />
			</Button>
		</div>
	);
}
