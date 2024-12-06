import Navbar from '@/components/Navbar';
import RightSidebarPage from '@/components/todo-details-panel/RightSidebarPage';
import TodoListSidebar from '@/components/todolist-sidebar/TodoListSidebar';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<>
			<div className="flex flex-col h-screen bg-slates-100 overflow-hidden">
				<header className="sticky top-0 left-0 z-20 w-full">
					<Navbar />
				</header>
				<div className="flex h-screen">
					<aside className="absolute lg:sticky top-0 left-0 z-30">
						<TodoListSidebar />
					</aside>

					<main className="w-full overflow-y-auto z-10">{children}</main>

					<aside className="absolute lg:sticky top-0 right-0 z-40">
						<RightSidebarPage />
					</aside>
				</div>
			</div>
		</>
	);
}
