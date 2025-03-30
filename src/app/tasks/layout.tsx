import TodoDetailsPanel from '@/components/details-panel/TodoDetailsPanel';
import TodoListsSidebar from '@/components/sidebar/TodoListSidebar';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<div className="flex flex-1 overflow-hidden">
			<aside className="absolute lg:sticky top-0 left-0 z-30">
				<TodoListsSidebar />
			</aside>

			<div id="modal-root" />
			<main className="w-full z-10">{children}</main>
			<aside className="absolute lg:sticky top-0 right-0 z-40">
				<TodoDetailsPanel />
			</aside>
		</div>
	);
}
