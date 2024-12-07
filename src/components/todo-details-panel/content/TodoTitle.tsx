'use client';

import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { CheckBox } from '@/components/todos/content/TodoItem';
import useTodoStore from '@/context/TodoContext';
import { CircleX, Pencil, Save } from 'lucide-react';
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
				{isEditing ? (
					<p className="text-lg ">Editing</p>
				) : (
					<p className="text-lg overflow-hidden text-wrap break-all">{title}</p>
				)}
			</div>
			{isEditing ? (
				<div className="flex gap-2">
					<Button onClick={() => handleEditClick(true)}>
						<Save size={18} />
					</Button>
					<Button onClick={() => handleEditClick(false)}>
						<CircleX size={18} />
					</Button>
				</div>
			) : (
				<Button onClick={() => handleEditClick(true)}>
					<Pencil size={18} />
				</Button>
			)}
		</div>
	);
}

const Button = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
	return (
		<button className="hover:bg-slate-200 active:bg-slate-200 rounded-md p-1 text-slate-600" onClick={() => onClick()}>
			{children}
		</button>
	);
};
