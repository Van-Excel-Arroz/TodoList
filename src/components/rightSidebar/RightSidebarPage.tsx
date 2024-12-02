import RightSidebarWrapper from './RightSidebarWrapper';
import RightSidebarHeader from './RightSidebarHeader';
import { Todo } from '@/types';

export default function RightSidebarPage({ todo }: { todo: Todo }) {
	return (
		<RightSidebarWrapper>
			<RightSidebarHeader />
			<h1>Hello World</h1>
			<p>{todo.task_text}</p>
		</RightSidebarWrapper>
	);
}
