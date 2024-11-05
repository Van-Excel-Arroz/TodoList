'use client';

import { updateTodolistAction } from '@/actions/todolist-action';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

interface FormInputs {
	title: string;
}

interface Todolist {
	id: number;
	title: string;
}

interface EditTodolistFormProps {
	todolist: Todolist;
	handleEditClick: (val: boolean) => void;
}

function EditTodolistForm({ todolist, handleEditClick }: EditTodolistFormProps) {
	const { register, handleSubmit, reset } = useForm<FormInputs>({
		defaultValues: {
			title: todolist.title,
		},
	});

	const onSubmit = async (data: FormInputs) => {
		if (todolist.title !== data.title) {
			await updateTodolistAction(todolist.id, data.title);
		}
		handleEditClick(false);
		reset();
	};

	const handleInputBlur = () => {
		handleEditClick(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('title')}
				type="text"
				placeholder={todolist.title}
				className="bg-transparent focus:outline-none border-b border-slate-950 my-3 mx-5"
				autoFocus
				onBlur={handleInputBlur}
				defaultValue={todolist.title}
			/>
		</form>
	);
}

export default memo(EditTodolistForm);
