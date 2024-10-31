import useSidebarStore from './Context/SidebarContext';
import HamburgerMenu from './Sidebar/SidebarToggle';

export default function EmptyTodolistMessage() {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<div className="container mx-auto px-6 p-9 max-w-screen-xl">
			<div className="flex gap-4">
				{!isSidebarOpen && <HamburgerMenu />}
				<h1 className="text-xl text-center font-bold">Select or create your own todolist in the sidebar </h1>
			</div>
		</div>
	);
}
