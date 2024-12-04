'use client';

import { Calendar, Plus } from 'lucide-react';
import { updateTodoCompletionAction } from '@/actions/todolist-action';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import RightSidebarHeader from './RightSidebarHeader';
import { DueDate } from '../main/TodoItem';
import { Category } from '@/types';
import TodoTitle from './TodoTitle';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

	return (
		<div
			className={`bg-white pb-9 pt-6 border-l-2 shadow-xl h-screen transition-[width] duration-200 ease-in-out overflow-hidden ${
				isRightSidebarOpen ? 'w-96' : 'w-0'
			}`}
		>
			<div className="flex flex-col gap-4 px-6">
				<RightSidebarHeader />
				<TodoTitle title={selectedTodo?.task_text ?? ''} isCompleted={selectedTodo?.is_completed ?? false} />
				<TodoDueDate dueDatetime={selectedTodo?.due_datetime ?? ''} />
				<TodoCategories categories={selectedTodo?.categories ?? []} />
			</div>
		</div>
	);
}

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

const TodoCategories = ({ categories }: { categories: Category[] }) => (
	<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border">
		<div className="flex justify-between items-center w-full text-slate-600">
			<p className="text-sm">Categories</p>
			<button className="block hover:bg-slate-200 rounded-md p-1" aria-label="Add Category">
				<Plus size={20} />
			</button>
		</div>
		<div className={`flex flex-wrap items-cente gap-2 ${categories.length === 0 ? 'py-0' : 'py-2'}`}>
			{categories.map(category => (
				<span
					key={category.id}
					className={`bg-white border rounded py-1 px-2 shadow-md hover:bg-slate-10`}
					style={{ color: category.hex_color }}
				>
					{category.category_title}
				</span>
			))}
		</div>
	</div>
);
