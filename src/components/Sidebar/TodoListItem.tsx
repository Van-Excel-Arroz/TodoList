import Link from 'next/link';
import { useMemo } from 'react';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

export default function TodoListItem({ todolist }: TodolistItemProps) {
	const linkElement = useMemo(
		() => <Link href={`/tasks/${todolist.id}`}>{todolist.title}</Link>,
		[todolist.id, todolist.title]
	);

	return linkElement;
}
