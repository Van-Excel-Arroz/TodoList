'use client';

import { updateTodoCompletionAction } from '@/actions/todo-action';
import { updateTodoTitleAction } from '@/actions/todo-action';
import { CheckBox } from '@/components/todos/content/TodoItem';
import useTodoStore from '@/context/TodoContext';
import { CircleX, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoTitleProps {
	title: string;
	isCompleted: boolean;
}

export default function TodoTitle({ title, isCompleted }: TodoTitleProps) {
	const { selectedTodo, setSelectedTodo, updateSelectedTodoTitle } = useTodoStore();
	const [isEditing, setIsEditing] = useState(false);

	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed, selectedTodo.todo_list_id);
		setSelectedTodo({
			...selectedTodo,
			is_completed: !selectedTodo.is_completed,
		});
	};

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	return (
		<div className="flex justify-between bg-slate-100 rounded-md p-4 border border-slate-300">
			<div className="flex items-center gap-4">
				<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
				{isEditing ? (
					<EditTodoForm
						title={title}
						handleEditClick={handleEditClick}
						todoId={selectedTodo!.id}
						todolistId={selectedTodo!.todo_list_id}
						updateSelectedTodoTitle={updateSelectedTodoTitle}
					/>
				) : (
					<p className="text-lg overflow-hidden text-wrap break-all">{title}</p>
				)}
			</div>
			{isEditing ? null : (
				<Button onClick={() => handleEditClick(true)} ariaLabel="Edit Todo Title">
					<Pencil size={18} />
				</Button>
			)}
		</div>
	);
}

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

function EditTodoForm({
	title,
	handleEditClick,
	todoId,
	todolistId,
	updateSelectedTodoTitle,
}: {
	title: string;
	handleEditClick: (val: boolean) => void;
	todoId: number;
	todolistId: number;
	updateSelectedTodoTitle: (newTitle: string) => void;
}) {
	const { register, handleSubmit, reset } = useForm<{ title: string }>();

	const onSubmit = async (data: { title: string }) => {
		if (title !== data.title) {
			await updateTodoTitleAction(todoId, data.title, todolistId);
			updateSelectedTodoTitle(data.title);
		}
		reset();
		handleEditClick(false);
	};

	const handleInputBlur = () => {
		handleEditClick(false);
	};

	return (
		<form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('title')}
				type="text"
				className="text-lg bg-transparent focus:outline-none border-b border-slate-950 w-11/12"
				autoFocus
				placeholder={title}
				defaultValue={title}
				onBlur={handleInputBlur}
			/>
			<div className="flex gap-2">
				<Button type="submit" ariaLabel="Save New Todo Title">
					<Save size={18} />
				</Button>
				<Button onClick={() => handleEditClick(false)} ariaLabel="Cancel Editing Todo Title">
					<CircleX size={18} />
				</Button>
			</div>
		</form>
	);
}

function Button({
	children,
	onClick,
	type,
	ariaLabel,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'submit';
	ariaLabel: string;
}) {
	return (
		<button
			className="hover:bg-slate-200 active:bg-slate-200 rounded-md p-1 text-slate-600"
			onClick={() => onClick && onClick()}
			type={type}
			aria-label={ariaLabel}
		>
			{children}
		</button>
	);
}
