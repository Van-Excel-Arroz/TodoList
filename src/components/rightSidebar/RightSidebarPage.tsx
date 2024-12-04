'use client';

import { Calendar, Plus } from 'lucide-react';
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
			className={`bg-white pb-9 pt-6 border-l-2 shadow-xl h-screen transition-[width] duration-200 ease-in-out overflow-hidden ${
				isRightSidebarOpen ? 'w-96' : 'w-0'
			}`}
		>
			<div className="flex flex-col gap-4 px-6">
				<RightSidebarHeader />
				<TodoTitle
					title={selectedTodo?.task_text ?? ''}
					isCompleted={selectedTodo?.is_completed ?? false}
					handleCheckboxChange={handleCheckboxChange}
				/>
				<TodoDueDate dueDatetime={selectedTodo?.due_datetime ?? ''} />
				<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border">
					<div className="flex justify-between items-center w-full text-slate-600">
						<p className="text-sm">Category</p>
						<button className="block hover:bg-slate-200 rounded-md p-1" aria-label="Add Category">
							<Plus size={20} />
						</button>
					</div>
					<div
						className={`flex flex-wrap items-center  gap-2 ${selectedTodo?.categories?.length === 0 ? 'py-0' : 'py-2'}`}
					>
						{selectedTodo?.categories?.map(category => (
							<span
								key={category.id}
								className={`border rounded py-1 px-2 shadow-md hover:bg-slate-10`}
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

const TodoTitle = ({
	title,
	isCompleted,
	handleCheckboxChange,
}: {
	title: string;
	isCompleted: boolean;
	handleCheckboxChange: () => void;
}) => (
	<div className="flex items-center gap-4 bg-slate-100 rounded-md p-4 border">
		<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
		<p className="text-lg overflow-hidden text-wrap">{title}</p>
	</div>
);

const TodoDueDate = ({ dueDatetime }: { dueDatetime: string }) => (
	<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border">
		<Calendar size={20} className="text-slate-800" />
		<div className="flex flex-col justify-start">
			<p className="text-sm text-slate-600">Due</p>
			{dueDatetime ? (
				<DueDate dueDatetime={dueDatetime ?? ''} textSize="base" />
			) : (
				<p className="text-slate-600">MM/DD/YYYY</p>
			)}
		</div>
	</div>
);
