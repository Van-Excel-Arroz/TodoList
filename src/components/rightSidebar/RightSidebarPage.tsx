'use client';

import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import { CheckBox, TodoWithDueDatetime } from '../main/TodoItem';
import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { Calendar } from 'lucide-react';

export default function RightSidebarPage() {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

	if (!selectedTodo) return null;

	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed, selectedTodo.todo_list_id);
		setSelectedTodo({
			...selectedTodo,
			is_completed: !selectedTodo.is_completed,
		});
	};

	return (
		<div
			className={`bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out overflow-hidden ${
				isRightSidebarOpen ? 'w-96' : 'w-0'
			}`}
		>
			<div className="px-6">
				<RightSidebarHeader />
				<div className="flex items-center gap-4 bg-slate-100 rounded-md p-4 border">
					<CheckBox isChecked={selectedTodo?.is_completed!} handleOnClick={handleCheckboxChange} />
					<p className="text-lg">{selectedTodo?.task_text}</p>
				</div>
				<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border">
					<Calendar size={20} />
					<div className="flex flex-col justify-start">
						<p className="text-sm text-slate-800">Due Date</p>
						<TodoWithDueDatetime isCompleted={selectedTodo.is_completed} task={selectedTodo.task_text} />
					</div>
				</div>
			</div>
		</div>
	);
}
