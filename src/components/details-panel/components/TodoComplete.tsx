import { updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoComplete() {
	const { selectedTodo, toggleSelectedTodoCompletion } = useSelectedTodoStore();
	const { toggleTodoCompletion } = useTodosStore();
	const isCompleted = selectedTodo?.is_completed ?? false;
	const todoId = selectedTodo?.id ?? 0;

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todoId, !isCompleted);
		toggleTodoCompletion(todoId);
		toggleSelectedTodoCompletion(todoId);
	};

	return (
		<div className="flex items-center gap-2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<p>{selectedTodo?.is_completed ? 'Completed' : 'Mark as completed'}</p>
		</div>
	);
}
