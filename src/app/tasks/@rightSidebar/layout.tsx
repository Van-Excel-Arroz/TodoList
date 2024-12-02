import RightSidebarPage from '@/components/rightSidebar/RightSidebarPage';
import { getTodoWithCategories } from '@/lib/todo';

interface RightSidebarLayoutProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

export default async function RightSidebarLayout({ searchParams }: RightSidebarLayoutProps) {
	const todoId = Number(searchParams.todo);
	const todo = await getTodoWithCategories(todoId);

	return <RightSidebarPage todo={todo} />;
}
