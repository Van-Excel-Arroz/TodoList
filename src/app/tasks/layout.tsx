import TodoListsSidebar from '@/components/sidebar/TodoListSidebar';
import DetailsPanelWrapper from '@/components/details-panel/ui/DetailsPanelWrapper';
import { getAuthenticatedUserId } from '@/lib/user';
import { redirect } from 'next/navigation';

interface LayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps): Promise<JSX.Element> {
	const userId = await getAuthenticatedUserId();

	if (!userId) {
		redirect('/login');
	}

	return (
		<div className="flex flex-1 h-screen">
			<aside className="absolute lg:sticky top-0 left-0 z-30">
				<TodoListsSidebar userId={userId} />
			</aside>

			<div id="modal-root" />
			<main className="w-full z-10">{children}</main>
			<DetailsPanelWrapper />
		</div>
	);
}
