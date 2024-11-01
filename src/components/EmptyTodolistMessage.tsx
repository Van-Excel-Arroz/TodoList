import useSidebarStore from './Context/SidebarContext';
import HamburgerMenu from './Sidebar/SidebarToggle';

export default function EmptyTodolistMessage() {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<div className="container mx-auto px-6 p-9 max-w-screen-xl">
			<div className="flex flex-col gap-4">
				{!isSidebarOpen && <HamburgerMenu />}
				<div className="flex justify-center items-center h-screen">
					<p className="text-3xl text-center font-bold">Select or create your own todolist in the sidebar</p>
				</div>
			</div>
		</div>
	);
}
