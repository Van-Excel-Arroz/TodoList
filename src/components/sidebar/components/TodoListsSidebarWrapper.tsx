'use client';

import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';

export default function TodoListsSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isTodoListsSidebarOpen, toggleTodoListsSidebar } = useTodoListsSidebarStore();
	console.log(isTodoListsSidebarOpen);
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
                    transition-width duration-300 ease-in-out
                    fixed lg:sticky top-0 left-0 
                    ${isTodoListsSidebarOpen ? 'w-72' : 'w-0'}

                    text-nowrap overflow-hidden
                `}
			>
				{children}
			</div>
		</>
	);
}
