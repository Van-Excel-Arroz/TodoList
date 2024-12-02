'use client';

import { useSearchParams } from 'next/navigation';
import RightSidebarWrapper from './RightSidebarWrapper';

export default function RightSidebarPage() {
	const searchParams = useSearchParams();
	const todoId = searchParams.get('todo');

	return (
		<RightSidebarWrapper>
			<h1>Hello World</h1>
			<p>{todoId}</p>
		</RightSidebarWrapper>
	);
}
