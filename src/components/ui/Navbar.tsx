'use client';

import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { House } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	return (
		<nav className="bg-white border-b-2 border-b-slate-200 drop-shadow-md h-10 px-6 flex items-center gap-4">
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
