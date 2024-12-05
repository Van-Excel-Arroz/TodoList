'use client';

import { CheckBox } from '../main/TodoItem';
import { updateTodoCompletionAction } from '@/actions/todolist-action';
import useTodoStore from '@/context/TodoContext';

interface TodoTitleProps {
	title: string;
	isCompleted: boolean;
}

export default function TodoTitle({ title, isCompleted }: TodoTitleProps) {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed, selectedTodo.todo_list_id);
		setSelectedTodo({
			...selectedTodo,
			is_completed: !selectedTodo.is_completed,
		});
	};

	return (
		<div className="flex items-center gap-4 bg-slate-100 rounded-md p-4 border border-slate-300">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<p className="text-lg overflow-hidden text-wrap">{title}</p>
		</div>
	);
}
