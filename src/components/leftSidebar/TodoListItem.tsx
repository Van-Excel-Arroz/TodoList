'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { TodoList } from '@/types';
import { CircleX, Pencil, Trash2 } from 'lucide-react';
import EditTodolistForm from './EditTodolistForm';

interface TodoListItemProps {
	todolist: TodoList;
}

function TodoListItem({ todolist }: TodoListItemProps) {
	const pathname = usePathname();
	const isSelectedPath = pathname === `/tasks/${todolist.id}`;
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	return (
		<div
			className={`flex items-center pr-5 group ${
				isSelectedPath ? 'border-l-4 border-slate-500 bg-slate-200' : 'pl-1 hover:bg-slate-100 '
			}`}
		>
			<div className="text-md w-full block">
				{isEditing ? (
					<EditTodolistForm todolist={todolist} handleEditClick={handleEditClick} />
				) : (
					<Link
						href={`/tasks/${todolist.id}`}
						className={`w-full block py-3 px-5 ${isSelectedPath ? 'font-normal' : 'font-light'}`}
					>
						{todolist.title}
					</Link>
				)}
			</div>

			{isEditing ? (
				<CancelEditButton handleEditClick={handleEditClick} />
			) : (
				<div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
					<EditButton handleEditClick={handleEditClick} />
					<DeleteButton todolistId={todolist.id} />
				</div>
			)}
		</div>
	);
}

const CancelEditButton = memo(({ handleEditClick }: { handleEditClick: (val: boolean) => void }) => {
	return (
		<button onClick={() => handleEditClick(false)} aria-label="Cancel Editing">
			<CircleX size={15} />
		</button>
	);
});

const EditButton = memo(({ handleEditClick }: { handleEditClick: (val: boolean) => void }) => {
	return (
		<button onClick={() => handleEditClick(true)} aria-label="Edit Todolist">
			<Pencil size={15} />
		</button>
	);
});

const DeleteButton = memo(({ todolistId }: { todolistId: number }) => {
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
			<button type="submit" aria-label="Delete Todolist">
				<Trash2 size={15} />
			</button>
		</form>
	);
});

export default memo(TodoListItem);
