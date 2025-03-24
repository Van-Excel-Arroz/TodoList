'use client';

import { Home } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import Link from 'next/link';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';

export default function TodoListsHeader() {
	const { setSelectedTodoId } = useSelectedTodoIdStore();

	return (
		<div className="flex items-center px-6 justify-between py-4 border-b border-slate-300">
			<Link href={'/'} className="flex items-center gap-2" onClick={() => setSelectedTodoId(0)}>
				<Button ariaLabel="Home">
					<Home size={22} className="text-slate-700" />
				</Button>
				<p className="text-lg font-bold text-slate-700">TodoApp</p>
			</Link>
		</div>
	);
}
