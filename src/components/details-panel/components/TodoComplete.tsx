import { updateTodoCompletionAction } from '@/actions/todo-action';
import CheckBox from '@/components/ui-shared/CheckBox';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoComplete({ isCompleted }: { isCompleted: boolean }) {
	const { selectedTodo } = useSelectedTodoStore();
	const { toggleTodoCompletion } = useTodosStore();
	const todoId = selectedTodo?.id ?? 0;

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todoId, !isCompleted);
		toggleTodoCompletion(todoId);
	};

	return (
		<div className="flex items-center gap-2">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<p>{isCompleted ? 'Completed' : 'Mark as completed'}</p>
		</div>
	);
}
