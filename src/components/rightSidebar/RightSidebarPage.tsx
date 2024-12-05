'use client';

import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';
import TodoTitle from './TodoTitle';
import TodoDueDate from './TodoDueDate';
import RightSidebarHeader from './RightSidebarHeader';
import TodoCategories from './TodoCategories';
import RightSidebarFooter from './RightSidebarFooter';

export default function RightSidebarPage() {
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const { isRightSidebarOpen, closeRightSidebar } = useRightSidebarStore();

	if (!selectedTodo) {
		closeRightSidebar();
		return null;
	}

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity lg:hidden cursor-pointer z-40 ${
					isRightSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					closeRightSidebar();
					setSelectedTodo(null);
				}}
			/>
			<div
				className={`fixed lg:relative right-0 top-0 bg-white pb-9 pt-6 border-l-2 shadow-xl lg:h-[calc(100vh-3.5rem)]  h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 backdrop-blur-sm bg-opacity-80 ${
					isRightSidebarOpen ? 'w-96' : 'w-0'
				}`}
			>
				<div className="flex flex-col gap-4 px-6">
					<RightSidebarHeader />
					<TodoTitle title={selectedTodo?.task_text ?? ''} isCompleted={selectedTodo?.is_completed ?? false} />
					<TodoDueDate dueDatetime={selectedTodo?.due_datetime ?? ''} />
					<TodoCategories categories={selectedTodo?.categories ?? []} todoId={selectedTodo?.id ?? 0} />
					<RightSidebarFooter createdAt={selectedTodo?.creation_date ?? ''} todoId={selectedTodo?.id!} />
				</div>
			</div>
		</>
	);
}
