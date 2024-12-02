'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { TodoList } from '@/types';
import { CircleX, Pencil, Trash2 } from 'lucide-react';
import EditTodolistForm from './EditTodolistForm';
import useRightSidebarStore from '@/context/RightSidebarContext';

interface TodoListItemProps {
	todolist: TodoList;
}

function TodoListItem({ todolist }: TodoListItemProps) {
	const pathname = usePathname();
	const isSelectedPath = pathname === `/tasks/${todolist.id}`;
	const [isEditing, setIsEditing] = useState(false);
	const { closeRightSidebar } = useRightSidebarStore();

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	return (
		<div
			className={`flex items-center pr-5 group relative w-full ${
				isSelectedPath ? 'border-l-4 border-slate-500 bg-slate-200' : 'pl-1 hover:bg-slate-100'
			}`}
		>
			{isEditing ? (
				<EditTodolistForm todolist={todolist} handleEditClick={handleEditClick} />
			) : (
				<Link
					href={`/tasks/${todolist.id}`}
					onClick={closeRightSidebar}
					className={`flex-1 text-ellipsis py-3 pl-5 text-nowrap overflow-hidden group-hover:max-w-[calc(100%-60px)] ${
						isSelectedPath ? 'font-normal' : 'font-light'
					}`}
				>
					{todolist.title}
				</Link>
			)}

			{isEditing ? (
				<CancelEditButton handleEditClick={handleEditClick} isActive={isSelectedPath} />
			) : (
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 absolute right-5">
					<EditButton handleEditClick={handleEditClick} isActive={isSelectedPath} />
					<DeleteButton todolistId={todolist.id} isActive={isSelectedPath} />
				</div>
			)}
		</div>
	);
}

const CancelEditButton = memo(
	({ handleEditClick, isActive }: { handleEditClick: (val: boolean) => void; isActive: boolean }) => {
		return (
			<button
				onClick={() => handleEditClick(false)}
				aria-label="Cancel Editing"
				className={`p-1 ml-7  rounded-md ${isActive ? 'hover:bg-slate-100' : 'hover:bg-slate-200'}`}
			>
				<CircleX size={15} />
			</button>
		);
	}
);

const EditButton = memo(
	({ handleEditClick, isActive }: { handleEditClick: (val: boolean) => void; isActive: boolean }) => {
		return (
			<button
				onClick={() => handleEditClick(true)}
				aria-label="Edit Todolist"
				className={`p-1  rounded-md ${isActive ? 'hover:bg-slate-100' : 'hover:bg-slate-200'}`}
			>
				<Pencil size={15} />
			</button>
		);
	}
);

const DeleteButton = memo(({ todolistId, isActive }: { todolistId: number; isActive: boolean }) => {
	const router = useRouter();
	const pathname = usePathname();

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await deleteTodolistAction(todolistId, 1);
		if (pathname === `/tasks/${todolistId}`) {
			router.push('/tasks/home');
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex items-center">
			<button
				type="submit"
				aria-label="Delete Todolist"
				className={`p-1  rounded-md ${isActive ? 'hover:bg-slate-100' : 'hover:bg-slate-200'}`}
			>
				<Trash2 size={15} />
			</button>
		</form>
	);
});

export default memo(TodoListItem);
