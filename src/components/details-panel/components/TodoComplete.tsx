import { updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';

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
			updateCompletedAt(selectedTodoId, new Date().toISOString());
		} else {
			updateCompletedAt(selectedTodoId, null);
		}
	};

	return (
		<div className="flex items-center gap-2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<p>{isCompleted ? 'Completed' : 'Mark as completed'}</p>
		</div>
	);
}
