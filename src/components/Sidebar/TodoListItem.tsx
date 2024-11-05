'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import DeleteTodolistButton from './DeleteTodolistButton';
import { useForm } from 'react-hook-form';

interface Todolist {
	id: number;
	title: string;
}

interface TodolistItemProps {
	todolist: Todolist;
}

interface FormInputs {
	title: string;
}

function TodoListItem({ todolist }: TodolistItemProps) {
	const pathname = usePathname();
	const isSelectedPath = pathname === `/tasks/${todolist.id}`;
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<FormInputs>({
		defaultValues: {
			title: todolist.title,
		},
	});

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	const onSubmit = (data: FormInputs) => {
		console.log('Title value:', data.title);
		handleEditClick(false);
		reset();
	};

	const handleInputBlur = () => {
		setIsEditing(false);
	};

	return (
		<div
			className={`flex items-center pr-5 group ${
				isSelectedPath ? 'border-l-4 border-slate-500 bg-slate-200' : 'pl-1 hover:bg-slate-100 '
			}`}
		>
			<div className="text-md w-full block">
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register('title')}
							type="text"
							placeholder={todolist.title}
							className="bg-transparent focus:outline-none border-b border-slate-950 my-3 mx-5"
							autoFocus
							onBlur={handleInputBlur}
							defaultValue={todolist.title}
						/>
					</form>
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
				<button onClick={() => handleEditClick(false)}>
					<MdOutlineCancel size={16} />
				</button>
			) : (
				<div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
					<button onClick={() => handleEditClick(true)}>
						<RiPencilFill size={16} />
					</button>
					<DeleteTodolistButton todolistId={todolist.id} />
				</div>
			)}
		</div>
	);
}

export default memo(TodoListItem);
