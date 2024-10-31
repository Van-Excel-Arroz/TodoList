import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

export default function TodoListItem({ todolist }: TodolistItemProps) {
	const pathname = usePathname();
	const isSelectedPath = pathname === `/tasks/${todolist.id}`;

	return (
		<div className={`hover:bg-slate-100 rounded-md ${isSelectedPath ? 'border border-black bg-slate-100' : ''}`}>
			<Link href={`/tasks/${todolist.id}`} className="font-thin w-full block py-3 px-5">
				{todolist.title}
			</Link>
		</div>
	);
}
