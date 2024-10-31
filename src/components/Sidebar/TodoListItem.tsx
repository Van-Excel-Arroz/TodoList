import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

function TodoListItem({ todolist }: TodolistItemProps) {
	const pathname = usePathname();
	const isSelectedPath = pathname === `/tasks/${todolist.id}`;

	return (
		<div className={`hover:bg-slate-100 rounded-md ${isSelectedPath ? 'border border-black bg-slate-100' : ''}`}>
			<Link href={`/tasks/${todolist.id}`} className="font-thin text-md w-full block py-3 px-5">
				{todolist.title}
			</Link>
		</div>
	);
}

export default memo(TodoListItem);
