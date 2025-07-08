import { updateTodoCompletedAtAction, updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import toast from 'react-hot-toast';

interface TodoCompleteProps {
	isCompleted: boolean;
	completedAt: string;
	accentColor: string;
}

export default function TodoComplete({ isCompleted, accentColor }: TodoCompleteProps) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoCompletion, updateCompletedAt } = useTodosStore();

	const handleCheckboxChange = async () => {
		toggleTodoCompletion(selectedTodoId);
		const result = await updateTodoCompletionAction(selectedTodoId, !isCompleted);

		if (!isCompleted) {
			const now = new Date().toISOString();
			updateCompletedAt(selectedTodoId, now);
			updateTodoCompletedAtAction(selectedTodoId, now);
		} else {
			updateCompletedAt(selectedTodoId, null);
			updateTodoCompletedAtAction(selectedTodoId, null);
		}
		if (!result.success) {
			toast.error(result.message);
			toggleTodoCompletion(selectedTodoId);
		}
	};

	return (
		<div className="flex justify-between items-center border border-slate-300 p-2 rounded-md w-1/2 ring-offset-2 ring-slate-400 hover:ring-2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} accentColor={accentColor} />
			<div className="text-center w-full">
				<p>{isCompleted ? 'Completed' : 'Complete'} </p>
			</div>
		</div>
	);
}
