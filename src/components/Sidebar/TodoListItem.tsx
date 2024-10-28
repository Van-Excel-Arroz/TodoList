import Link from 'next/link';
import { memo } from 'react';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

const TodoListItem = memo(
	function ({ todolist }: TodolistItemProps) {
		return <Link href={`/tasks/${todolist.id}`}>{todolist.title}</Link>;
	},
	(prevProps, nextProps) => {
		return prevProps.todolist.id === nextProps.todolist.id && prevProps.todolist.title === nextProps.todolist.title;
	}
);
export default TodoListItem;
