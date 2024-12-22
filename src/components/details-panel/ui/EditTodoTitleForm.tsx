import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useTodosStore from '@/context/TodosContext';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditTodoFormProps {
	title: string;

	todoId: number;
	updateSelectedTodoTitle: (newTitle: string) => void;
}

export default function EditTodoTitleForm({
	title,

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
	};

	return (
		<form className="flex items-center justify-between w-full" onSubmit={handleSubmit(onSubmit)}>
			<textarea
				{...register('title')}
				className="rounded-lg py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
				autoFocus
				placeholder={title}
				defaultValue={title}
			/>
			{/* <div className="flex gap-1">
				<Button type="submit" ariaLabel="Save New Todo Title">
					<Check size={18} />
				</Button>
				<Button ariaLabel="Cancel Editing Todo Title">
					<X size={18} />
				</Button>
			</div> */}
		</form>
	);
}
