'use client';

import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import TodoTitle from './TodoTitle';
import TodoDueDate from './TodoDueDate';
import RightSidebarHeader from './RightSidebarHeader';
import TodoCategories from './TodoCategories';

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
				<TodoCategories categories={selectedTodo?.categories ?? []} todoId={selectedTodo?.id ?? 0} />
			</div>
		</div>
	);
}
