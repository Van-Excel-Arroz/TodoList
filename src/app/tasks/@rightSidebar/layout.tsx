import RightSidebarPage from '@/components/rightSidebar/RightSidebarPage';
import { getTodo } from '@/lib/todo';

interface RightSidebarLayoutProps {
	params: {
		taskId: string;
	};
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

export default async function RightSidebarLayout({ params, searchParams }: RightSidebarLayoutProps) {
	console.log(searchParams);
	if (!searchParams || !searchParams.todo) {
		return <div>Todo Not Found</div>;
	}
	const todoId = Number(searchParams.todo);
	const todo = await getTodo(todoId);

	if (!todo) {
		return <div>Todo Not Found</div>;
	}

	return <RightSidebarPage todo={todo} />;
}
