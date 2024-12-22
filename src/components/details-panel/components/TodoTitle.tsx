'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { useForm } from 'react-hook-form';

interface TodoTitleProps {
	title: string;
}

interface EditTodoFormProps {
	title: string;

	todoId: number;
	updateSelectedTodoTitle: (newTitle: string) => void;
}

export default function TodoTitle({ title }: TodoTitleProps) {
	const { selectedTodo, updateSelectedTodoTitle } = useSelectedTodoStore();
	const { register, handleSubmit, reset } = useForm<{ title: string }>();
	const { updateTodoTitle } = useTodosStore();
	const onSubmit = async (data: { title: string }) => {
		if (!selectedTodo) return;
		if (title !== data.title) {
			await updateTodoTitleAction(selectedTodo.id, data.title);
			updateSelectedTodoTitle(data.title);
			updateTodoTitle(selectedTodo.id, data.title);
		}
		reset();
	};
	return (
		<div className="flex items-start gap-2 flex-col w-full">
			<p className="text-slate-600">Title</p>
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
		</div>
	);
}
