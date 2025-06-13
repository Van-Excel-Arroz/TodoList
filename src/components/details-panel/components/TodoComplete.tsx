import { updateTodoCompletedAtAction, updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';

interface TodoCompleteProps {
	isCompleted: boolean;
	completedAt: string;
	accentColor: string;
}

export default function TodoComplete({ isCompleted, accentColor }: TodoCompleteProps) {
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
		<div className="flex justify-between items-center border border-slate-300 p-2 rounded-md w-1/2 ring-offset-2 ring-slate-400 hover:ring-2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} accentColor={accentColor} />
			<div className="text-center w-full">
				<p>{isCompleted ? 'Completed' : 'Complete'} </p>
			</div>
		</div>
	);
}
