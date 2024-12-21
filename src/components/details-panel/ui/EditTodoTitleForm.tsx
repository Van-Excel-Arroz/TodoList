import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditTodoFormProps {
	title: string;
	handleEditClick: (val: boolean) => void;
	todoId: number;
	updateSelectedTodoTitle: (newTitle: string) => void;
}

export default function EditTodoTitleForm({
	title,
	handleEditClick,
	todoId,
	updateSelectedTodoTitle,
}: EditTodoFormProps) {
	const { register, handleSubmit, reset } = useForm<{ title: string }>();
	const { updateTodoTitle } = useTodosStore();

	const onSubmit = async (data: { title: string }) => {
		if (title !== data.title) {
			await updateTodoTitleAction(todoId, data.title);
			updateSelectedTodoTitle(data.title);
			updateTodoTitle(todoId, data.title);
		}
		reset();
		handleEditClick(false);
	};

	return (
		<form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('title')}
				type="text"
				className="bg-transparent focus:outline-none border-b border-slate-950 w-11/12"
				autoFocus
				placeholder={title}
				defaultValue={title}
			/>
			<div className="flex">
				<Button type="submit" ariaLabel="Save New Todo Title">
					<Check size={18} />
				</Button>
				<Button onClick={() => handleEditClick(false)} ariaLabel="Cancel Editing Todo Title">
					<X size={18} />
				</Button>
			</div>
		</form>
	);
}
