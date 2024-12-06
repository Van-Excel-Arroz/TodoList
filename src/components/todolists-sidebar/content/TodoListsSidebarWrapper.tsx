'use client';

import useTodoListSidebarStore from '@/context/TodoListSidebarContext';

export default function TodoListsSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isTodoListSidebarOpen, toggleTodoListSidebar } = useTodoListSidebarStore();

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity lg:hidden cursor-pointer ${
					isTodoListSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={toggleTodoListSidebar}
			/>
			<div
				className={`fixed lg:relative left-0 top-0 border-r-2 rounded-r-3xl drop-shadow-xl bg-white pb-9 pt-6 lg:h-[calc(100vh-3.5rem)] h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden backdrop-blur-sm bg-opacity-80 ${
					isTodoListSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
