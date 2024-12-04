'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';
import { ClipboardList } from 'lucide-react';

export default function NoTodoListSelected() {
	const { toggleLeftSidebar } = useLeftSidebarStore();
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<ClipboardList size={48} className="text-gray-400" />
			<div className="text-center w-5/6">
				<p className="mt-4 text-2xl font-semibold">No TodoList Selected</p>
				<p className="mt-2 text-gray-600">
					Create a new todolist or select an exisiting one from the sidebar to get started.
				</p>
				<button
					className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-slate-900 active:bg-slate-800"
					onClick={toggleLeftSidebar}
				>
					Open Sidebar
				</button>
			</div>
		</div>
	);
}
