import { updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoComplete({ isCompleted }: { isCompleted: boolean }) {
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
