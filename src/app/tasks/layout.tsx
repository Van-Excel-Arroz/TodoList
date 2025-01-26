import TodoDetailsPanel from '@/components/details-panel/TodoDetailsPanel';
import TodoListsSidebar from '@/components/sidebar/TodoListsSidebar';
import Navbar from '@/components/ui-shared/Navbar';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			{/* <header className="sticky top-0 left-0 z-20 w-full">
				<Navbar />
			</header> */}
			<div className="flex flex-1 overflow-hidden">
				<aside className="absolute lg:sticky top-0 left-0 z-30">
					<TodoListsSidebar />
				</aside>

				<main className="w-full z-10">{children}</main>

				<aside className="absolute lg:sticky top-0 right-0 z-40">
					<TodoDetailsPanel />
				</aside>
			</div>
		</div>
	);
}
