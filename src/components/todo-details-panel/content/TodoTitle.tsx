'use client';

import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { CheckBox } from '@/components/todos/content/TodoItem';
import useTodoStore from '@/context/TodoContext';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface TodoTitleProps {
	title: string;
	isCompleted: boolean;
}

export default function TodoTitle({ title, isCompleted }: TodoTitleProps) {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
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
				<p className="text-lg overflow-hidden text-wrap break-all">{title}</p>
			</div>
			<button
				className="hover:bg-slate-200 active:bg-slate-200 rounded-md p-1 text-slate-600"
				onClick={() => handleEditClick(true)}
			>
				<Pencil size={18} />
			</button>
		</div>
	);
}
