'use client';

import { Calendar } from 'lucide-react';
import { updateTodoCompletionAction } from '@/actions/todolist-action';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import RightSidebarHeader from './RightSidebarHeader';
import { CheckBox, DueDate } from '../main/TodoItem';

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
			className={`bg-white pb-9 pt-6 h-screen transition-[width] duration-200 ease-in-out overflow-hidden ${
				isRightSidebarOpen ? 'w-96' : 'w-0'
			}`}
		>
			<div className="flex flex-col gap-4 px-6">
				<RightSidebarHeader />
				<div className="flex items-center gap-4 bg-slate-100 rounded-md p-4 border">
					<CheckBox isChecked={selectedTodo?.is_completed!} handleOnClick={handleCheckboxChange} />
					<p className="text-lg">{selectedTodo?.task_text}</p>
				</div>
				<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border">
					<Calendar size={20} />
					<div className="flex flex-col justify-start">
						<p className="text-xs text-slate-800">Due</p>
						<DueDate dueDatetime={selectedTodo?.due_datetime!} textSize="sm" />
					</div>
				</div>
				<div className="flex flex-col items-start gap-4 bg-slate-100 rounded-md px-4 py-2 border">
					<p className="text-xs text-slate-800">Category</p>
					<div className="flex flex-wrap items-center gap-2 pb-2">
						{selectedTodo?.categories?.map(category => (
							<span
								className={`text-sm border rounded py-1 px-2 shadow-md hover:bg-slate-10`}
								style={{ color: category.hex_color }}
							>
								{category.category_title}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
