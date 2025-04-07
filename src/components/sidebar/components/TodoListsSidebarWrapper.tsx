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
				aria-hidden="true"
			/>

			<div
				className={`
                    flex flex-col
                    bg-white border-r border-slate-300
                    h-screen
                    transition-transform duration-300 ease-in-out lg:transition-none 
                    fixed lg:sticky top-0 left-0 
                    lg:w-72 
                    ${isTodoListsSidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0'}

                    text-nowrap overflow-hidden
                `}
			>
				{children}
			</div>
		</>
	);
}
