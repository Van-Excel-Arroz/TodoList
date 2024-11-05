'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import DeleteTodolistButton from './DeleteTodolistButton';
import { useForm } from 'react-hook-form';

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
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset, watch } = useForm({
		defaultValues: {
			title: todolist.title,
		},
	});
	const inputRef = useRef<HTMLInputElement>(null);

	console.log('Form values:', watch());

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	const onSubmit = (data: any) => {
		console.log(data.title);
		console.log('On Submit function');
		handleEditClick(false);
		reset();
	};

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	const handleInputBlur = () => {
		setIsEditing(false);
	};

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
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register('title', { maxLength: { value: 50, message: 'Exceeded maximum length of 50' } })}
							type="text"
							placeholder={todolist.title}
							className="bg-transparent focus:outline-none border-b border-slate-950"
							ref={inputRef}
							onBlur={handleInputBlur}
							defaultValue={todolist.title}
						/>
					</form>
				) : (
					todolist.title
				)}
			</Link>
			<div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
				<button onClick={() => handleEditClick(true)}>
					<RiPencilFill size={16} className="cursor-pointer" />
				</button>

				<DeleteTodolistButton todolistId={todolist.id} />
			</div>
		</div>
	);
}

export default memo(TodoListItem);
