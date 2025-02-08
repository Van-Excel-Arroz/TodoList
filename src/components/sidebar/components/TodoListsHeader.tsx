'use client';

import { usePathname } from 'next/navigation';
import TodoListsSidebarToggle from '../ui/TodoListsSidebarToggle';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';

export default function TodoListsHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';

	return (
		<div className="flex items-center justify-between py-4 border-b border-slate-300">
			<div className="flex items-center gap-2">
				<Button ariaLabel="Home">
					<Home />
				</Button>
			</div>
			{!isHome && <TodoListsSidebarToggle />}
		</div>
	);
}
