'use client';

import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import { CheckBox } from '../main/TodoItem';
import { updateTodoCompletionAction } from '@/actions/todolist-action';

export default function RightSidebarPage() {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

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
				isRightSidebarOpen ? 'w-80' : 'w-0'
			}`}
		>
			<div className="px-6">
				<RightSidebarHeader />
				<div className="flex items-center gap-2">
					<CheckBox isChecked={selectedTodo?.is_completed!} handleOnClick={handleCheckboxChange} />
					<p className="text-lg">{selectedTodo?.task_text}</p>
				</div>
			</div>
		</div>
	);
}
