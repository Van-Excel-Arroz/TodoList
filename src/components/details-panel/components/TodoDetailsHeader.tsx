'use client';

import { deleteTodoAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useTodosStore from '@/context/TodosContext';
import { ArrowBigRightDashIcon, Trash2 } from 'lucide-react';

export default function TodoDetailsHeader() {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { deleteTodo } = useTodosStore();

	const handleCloseRightSidebar = () => {
		closeTodoDetailsPanel();
		setSelectedTodoId(0);
	};

	const handleDeleteClick = async () => {
		await deleteTodoAction(selectedTodoId);
		deleteTodo(selectedTodoId);
		closeTodoDetailsPanel();
		setSelectedTodoId(0);
	};
	return (
		<div className="flex items-center justify-between py-6 border-b border-slate-300 sticky top-0 bg-[#F3F3F4] lg:bg-white">
			<Button onClick={handleCloseRightSidebar} ariaLabel="Close Todo Menu">
				<ArrowBigRightDashIcon size={22} />
			</Button>
			<p className="flex-1 text-xl font-medium text-center px-6">Task Details</p>
			<Button onClick={handleDeleteClick} ariaLabel="Delete Todo">
				<Trash2 size={18} />
			</Button>
		</div>
	);
}
