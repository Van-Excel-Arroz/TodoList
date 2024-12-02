'use client';

import RightSidebarWrapper from './RightSidebarWrapper';
import RightSidebarHeader from './RightSidebarHeader';
import { useSearchParams } from 'next/navigation';

export default function RightSidebarPage() {
	const todoId = useSearchParams().get('todo');
	return (
		<RightSidebarWrapper>
			<RightSidebarHeader />
			<h1>Hello World</h1>
			{todoId}
		</RightSidebarWrapper>
	);
}
