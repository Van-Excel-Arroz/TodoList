'use client';

import { useSearchParams } from 'next/navigation';
import RightSidebarWrapper from './RightSidebarWrapper';
import RightSidebarHeader from './RightSidebarHeader';

export default function RightSidebarPage() {
	const searchParams = useSearchParams();
	const todoId = searchParams.get('todo');

	return (
		<RightSidebarWrapper>
			<RightSidebarHeader />
			<h1>Hello World</h1>
			<p>{todoId}</p>
		</RightSidebarWrapper>
	);
}
