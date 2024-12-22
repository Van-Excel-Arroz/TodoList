'use client';

import { updateTodoCompletionAction } from '@/actions/todo-action';

import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import EditTodoTitleForm from '../ui/EditTodoTitleForm';
import CheckBox from '@/components/ui-shared/CheckBox';
import { Button } from '@/components/ui-shared/Button';

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
			className={`flex justify-between bg-slate-100 rounded-md p-4 border   ${
				isEditing ? 'border-slate-400' : 'border-slate-300'
			}`}
			onBlur={handleInputBlur}
			tabIndex={-1}
		>
			<div className="flex items-center gap-4 w-full">
				<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
				{isEditing ? (
					<EditTodoTitleForm
						title={title}
						handleEditClick={handleEditClick}
						todoId={selectedTodo!.id}
						updateSelectedTodoTitle={updateSelectedTodoTitle}
					/>
				) : (
					<div className="flex flex-wrap overflow-hidden">
						<span className="text-wrap break-words inline-block">{title}</span>
						{isEditing ? null : (
							<Button onClick={() => handleEditClick(true)} ariaLabel="Edit Todo Title">
								<Pencil size={18} />
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
