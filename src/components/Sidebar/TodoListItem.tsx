import Link from 'next/link';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

export default function TodoListItem({ todolist }: TodolistItemProps) {
	return (
		<Link href={`/tasks/${todolist.id}`} className="font-thin w-full block py-3 px-5">
			{todolist.title}
		</Link>
	);
}
