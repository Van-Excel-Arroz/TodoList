'use client';

import dynamic from 'next/dynamic';
const TodoDetailsPanel = dynamic(() => import('../TodoDetailsPanel'), { ssr: false });

export default function DetailsPanelWrapper() {
	return (
		<aside className="absolute lg:sticky top-0 right-0 z-40">
			<TodoDetailsPanel />
		</aside>
	);
}
