'use client';

import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import TodoTitle from './TodoTitle';
import TodoDueDate from './TodoDueDate';
import RightSidebarHeader from './RightSidebarHeader';
import TodoCategories from './TodoCategories';

export default function RightSidebarPage() {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const { isRightSidebarOpen, closeRightSidebar } = useRightSidebarStore();

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity md:hidden cursor-pointer z-40 ${
					isRightSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					closeRightSidebar();
					setSelectedTodo(null);
				}}
			/>
			<div
				className={`fixed lg:relative right-0 top-0 bg-white pb-9 pt-6 border-l-2 shadow-xl h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 ${
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
		</>
	);
}
