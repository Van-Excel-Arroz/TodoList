import { updateTodolistAction } from '@/actions/todolist-action';
import { Button } from '@/components/ui-shared/Button';
import useTodoListsStore from '@/context/TodoListsContext';
import { TodoList } from '@/types';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditTodoListFormProps {
	todolist: TodoList;
	handleEditClick: (val: boolean) => void;
}

export default function EditTodoListForm({ todolist, handleEditClick }: EditTodoListFormProps) {
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>();
	const { updateTodolistTitle } = useTodoListsStore();

	const onSubmit = async (data: { title: string }) => {
		if (!data.title?.trim()) return;
		if (todolist.title !== data.title) {
			await updateTodolistAction(todolist.id, data.title);
			updateTodolistTitle(todolist.id, data.title);
		}
		handleEditClick(false);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
			<input
				{...register('title')}
				type="text"
				placeholder={todolist.title}
				className="text-sm lg:text-base bg-transparent focus:outline-none border-b border-slate-950 my-1 mr-2 w-3/4 "
				autoFocus
				defaultValue={todolist.title}
			/>
			<div className="flex items-center gap-2">
				<Button type="submit" ariaLabel="Save New Todolist Title">
					<Check size={15} />
				</Button>

				<Button onClick={() => handleEditClick(false)} ariaLabel="Cancel Editing">
					<X size={15} />
				</Button>
			</div>
		</form>
	);
}
