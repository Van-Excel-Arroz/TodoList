'use client';

import { deleteTodoAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import Typography from '@/components/ui-shared/Typography';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { PanelRight, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function TodoDetailsHeader() {
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { deleteTodo } = useTodosStore();

	const handleCloseRightSidebar = () => {
		setSelectedTodoId(0);
	};

	const handleDelete = async () => {
		const toastId = toast.loading('Deleting todo...');
		const result = await deleteTodoAction(selectedTodoId);
		if (result.success) {
			toast.success(result.message, { id: toastId });
			deleteTodo(selectedTodoId);
			setSelectedTodoId(0);
		} else {
			toast.error(result.message, { id: toastId });
		}
	};
	return (
		<div className="flex items-center justify-between py-[19px] px-6 border-b border-slate-300 sticky top-0 bg-white">
			<Typography className="flex-1">Task Details</Typography>
			<Button onClick={handleDelete} ariaLabel="Delete Todo">
				<Trash2 size={20} className="text-red-600" />
			</Button>
			<Button onClick={handleCloseRightSidebar} ariaLabel="Close Todo Menu" className="ml-2">
				<PanelRight size={22} />
			</Button>
		</div>
	);
}
