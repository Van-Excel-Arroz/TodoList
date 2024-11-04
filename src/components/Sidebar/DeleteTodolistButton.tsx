import { MdDeleteOutline } from 'react-icons/md';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { memo } from 'react';

interface DeleteTodolistButtonProps {
	todolistId: number;
}

function DeleteTodolistButton({ todolistId }: DeleteTodolistButtonProps) {
	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await deleteTodolistAction(todolistId, 1);
	};

	return (
		<form onSubmit={onSubmit}>
			<button type="submit">
				<MdDeleteOutline size={16} className="cursor-pointer" />
			</button>
		</form>
	);
}

export default memo(DeleteTodolistButton);
