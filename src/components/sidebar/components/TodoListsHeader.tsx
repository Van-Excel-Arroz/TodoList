'use client';

import { usePathname } from 'next/navigation';
import TodoListsSidebarToggle from '../ui/TodoListsSidebarToggle';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import Link from 'next/link';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';

export default function TodoListsHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	const { setSelectedTodoId } = useSelectedTodoIdStore();

	return (
		<div className="flex items-center justify-between py-4 border-b border-slate-300">
			<Link href={'/'} className="flex items-center gap-2" onClick={() => setSelectedTodoId(0)}>
				<Button ariaLabel="Home">
					<Home />
				</Button>
				<p className="text-lg">TodoApp</p>
			</Link>
			{!isHome && <TodoListsSidebarToggle />}
		</div>
	);
}
