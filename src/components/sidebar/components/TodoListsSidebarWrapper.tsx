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
				className={`fixed lg:relative left-0 border-r border-slate-300 top-0 bg-white pb-9 h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
					isTodoListsSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
