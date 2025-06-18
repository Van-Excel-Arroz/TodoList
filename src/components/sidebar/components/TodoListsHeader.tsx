'use client';

import { Home } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import Link from 'next/link';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import Typography from '@/components/ui-shared/Typography';

export default function TodoListsHeader() {
	const { setSelectedTodoId } = useSelectedTodoIdStore();

	return (
		<div className="flex items-center px-6 justify-between py-[19px] border-b border-slate-300">
			<Link href={'/'} className="flex items-center gap-2" onClick={() => setSelectedTodoId(0)}>
				<Button ariaLabel="Home">
					<Home size={22} />
				</Button>
				<Typography>Todo App</Typography>
			</Link>
		</div>
	);
}
