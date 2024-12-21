'use client';

import { updateTodoCompletionAction } from '@/actions/todo-action';
import { Button } from '@/components/ui/Button';
import CheckBox from '@/components/ui/CheckBox';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

import EditTodoTitleForm from '../ui/EditTodoTitleForm';

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
					<EditTodoTitleForm
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
