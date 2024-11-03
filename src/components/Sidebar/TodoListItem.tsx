import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';

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
	const [isHovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<div
			className={`flex items-center pr-5 ${
				isSelectedPath ? 'border-l-4 border-slate-500 bg-slate-200' : 'pl-1 hover:bg-slate-100 '
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Link href={`/tasks/${todolist.id}`} className="font-thin text-md w-full block py-3 px-5">
				{todolist.title}
			</Link>
			<div className="flex items-center gap-3">
				{isHovered && <RiPencilFill size={16} className="cursor-pointer" />}
				{isHovered && <MdDeleteOutline size={16} className="cursor-pointer" />}
			</div>
		</div>
	);
}

export default memo(TodoListItem);
