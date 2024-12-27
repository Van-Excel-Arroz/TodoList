import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoStore from '@/context/SelectedTodoContext';

export default function TodoImportance() {
	const { selectedTodo } = useSelectedTodoStore();
	const isImportant = selectedTodo?.is_important ?? false;

	return (
		<div className="flex items-center">
			<Importance isImportant={isImportant} />
		</div>
	);
}
