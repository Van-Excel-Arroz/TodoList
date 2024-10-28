import { useSidebar } from '@/components/Context/SidebarContext';
import HamburgerMenu from './Sidebar/SidebarToggle';

export default function EmptyTodolistMessage() {
	const { isSidebarOpen } = useSidebar();

	return (
		<div className="container mx-auto p-10 max-w-screen-xl">
			<div className="flex gap-4">
				{!isSidebarOpen && <HamburgerMenu />}
				<h1 className="text-xl font-bold">Select or create your own todolist in the sidebar </h1>
			</div>
		</div>
	);
}
