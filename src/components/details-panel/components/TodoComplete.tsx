import { updateTodoCompletedAtAction, updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { format } from 'date-fns';

interface TodoCompleteProps {
	isCompleted: boolean;
	completedAt: string;
}

export default function TodoComplete({ isCompleted, completedAt }: TodoCompleteProps) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoCompletion, updateCompletedAt } = useTodosStore();

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(selectedTodoId, !isCompleted);
		toggleTodoCompletion(selectedTodoId);
		if (!isCompleted) {
			const now = new Date().toISOString();
			updateCompletedAt(selectedTodoId, now);
			await updateTodoCompletedAtAction(selectedTodoId, now);
		} else {
			updateCompletedAt(selectedTodoId, null);
			await updateTodoCompletedAtAction(selectedTodoId, null);
		}
	};

	return (
		<div className="flex justify-between items-center border border-slate-300 p-2 rounded-md w-1/2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<div className="text-center w-full">
				<p>{isCompleted ? 'Completed' : 'Mark as completed'} </p>
				{completedAt && <p className="text-sm text-slate-600">{format(new Date(completedAt), 'MM/dd/yy')}</p>}
			</div>
		</div>
	);
}
