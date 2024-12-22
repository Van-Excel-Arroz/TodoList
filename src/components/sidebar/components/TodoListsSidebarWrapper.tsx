'use client';

import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';

export default function TodoListsSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isTodoListsSidebarOpen, toggleTodoListsSidebar } = useTodoListsSidebarStore();

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden cursor-pointer ${
					isTodoListsSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={toggleTodoListsSidebar}
			/>
			<div
				className={`fixed lg:relative left-0 border-r border-slate-300 top-0 bg-white pb-9 lg:h-[calc(100vh-2.5rem)] h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden backdrop-blur-sm bg-opacity-80 ${
					isTodoListsSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
