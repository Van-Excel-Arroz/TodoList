'use client';

import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { House } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	return (
		<nav className="bg-white border-b border-b-slate-300 h-10 px-6 flex items-center gap-4">
			<Link
				href="/"
				className="text-lg font-bold"
				aria-label="home"
				onClick={() => {
					closeTodoDetailsPanel();
				}}
			>
				<House />
			</Link>
			<p>TodoList App</p>
		</nav>
	);
}
