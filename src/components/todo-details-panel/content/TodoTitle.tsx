'use client';

import { updateTodoCompletionAction } from '@/actions/todo-action';
import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui/Button';
import { CheckBox } from '@/components/todos/content/TodoItem';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoTitleProps {
	title: string;
	isCompleted: boolean;
}

export default function TodoTitle({ title, isCompleted }: TodoTitleProps) {
	const { selectedTodo, toggleSelectedTodoCompletion, updateSelectedTodoTitle } = useSelectedTodoStore();
	const { toggleTodoCompletion } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);

	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed);
		toggleTodoCompletion(selectedTodo.id);
		toggleSelectedTodoCompletion(selectedTodo.id);
	};

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleEditClick(false);
		}
	};

	return (
		<div
			className="flex justify-between bg-slate-100 rounded-md p-4 border border-slate-300"
			onBlur={handleInputBlur}
			tabIndex={-1}
		>
			<div className="flex items-center gap-4">
				<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
				{isEditing ? (
					<EditTodoForm
						title={title}
						handleEditClick={handleEditClick}
						todoId={selectedTodo!.id}
						updateSelectedTodoTitle={updateSelectedTodoTitle}
					/>
				) : (
					<p className="overflow-hidden text-wrap break-words">{title}</p>
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

interface EditTodoFormProps {
	title: string;
	handleEditClick: (val: boolean) => void;
	todoId: number;
	updateSelectedTodoTitle: (newTitle: string) => void;
}

function EditTodoForm({ title, handleEditClick, todoId, updateSelectedTodoTitle }: EditTodoFormProps) {
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
		<form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('title')}
				type="text"
				className="text-lg bg-transparent focus:outline-none border-b border-slate-950 w-11/12"
				autoFocus
				placeholder={title}
				defaultValue={title}
			/>
			<div className="flex gap-2">
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
