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
		<Link href={`/tasks/${todolist.id}`} shallow>
			{todolist.title}
		</Link>
	);
}
