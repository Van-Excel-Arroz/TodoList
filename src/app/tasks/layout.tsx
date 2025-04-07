import TodoListsSidebar from '@/components/sidebar/TodoListSidebar';
import DetailsPanelWrapper from '@/components/details-panel/ui/DetailsPanelWrapper';

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
			<DetailsPanelWrapper />
		</div>
	);
}
