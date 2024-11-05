import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import DeleteTodolistButton from './DeleteTodolistButton';

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
		<div
			className={`flex items-center pr-5 group ${
				isSelectedPath ? 'border-l-4 border-slate-500 bg-slate-200' : 'pl-1 hover:bg-slate-100 '
			}`}
		>
			<Link
				href={`/tasks/${todolist.id}`}
				className={`text-md w-full block py-3 px-5 ${isSelectedPath ? 'font-normal' : 'font-light'}`}
			>
				{todolist.title}
			</Link>
			<div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
				<RiPencilFill size={16} className="cursor-pointer" />
				<DeleteTodolistButton todolistId={todolist.id} />
			</div>
		</div>
	);
}

export default memo(TodoListItem);
