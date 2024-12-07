'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { TodoList } from '@/types';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import useTodoStore from '@/context/TodoContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { updateTodolistAction } from '@/actions/todolist-action';
import { useForm } from 'react-hook-form';

function TodoListItem({ todolist }: { todolist: TodoList }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isSelectedPath = searchParams.get('id') === todolist.id.toString();
	const currentId = searchParams.get('id');
	const [isEditing, setIsEditing] = useState(false);
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { selectedTodo, setSelectedTodo } = useTodoStore();

	const handleTodoListClick = () => {
		closeTodoDetailsPanel();
		if (selectedTodo?.todo_list_id === todolist.id) {
			setSelectedTodo(null);
		}
	};

	const handleEditClick = (val: boolean) => {
		setIsEditing(val);
	};

	const onSubmit = async () => {
		await deleteTodolistAction(todolist.id, 1);
		if (currentId === todolist.id.toString()) {
			closeTodoDetailsPanel();
			router.push('/tasks/');
		}
	};

	const handleInputBlur = () => {
		handleEditClick(false);
	};

	return (
		<div
			className={`flex items-center pr-5 group relative w-full active:bg-sky-50 ${
				isSelectedPath ? 'border-l-4 border-slate-400 bg-sky-100 active:bg-sky-100' : 'pl-1 hover:bg-sky-50'
			}`}
			onBlur={handleInputBlur}
		>
			{isEditing ? (
				<EditTodolistForm todolist={todolist} handleEditClick={handleEditClick} isActive={isSelectedPath} />
			) : (
				<Link
					href={`/tasks/?id=${todolist.id}`}
					onClick={handleTodoListClick}
					className={`flex-1 text-ellipsis py-3 pl-5 text-nowrap overflow-hidden group-hover:max-w-[calc(100%-60px)] ${
						isSelectedPath ? 'font-normal' : 'font-light'
					}`}
				>
					{todolist.title}
				</Link>
			)}

			{!isEditing && (
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 absolute right-5">
					<Button onClick={() => handleEditClick(true)} ariaLabel="Edit Todolist Title" isActive={isSelectedPath}>
						<Pencil size={15} />
					</Button>
					<Button type="submit" ariaLabel="Delete Todolist" isActive={isSelectedPath} onClick={onSubmit}>
						<Trash2 size={15} />
					</Button>
				</div>
			)}
		</div>
	);
}

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

const Button = ({
	children,
	onClick,
	type,
	ariaLabel,
	isActive,
}: {
	children: React.ReactNode;
	onClick?: () => void | Promise<void>;
	type?: 'submit';
	ariaLabel: string;
	isActive: boolean;
}) => {
	return (
		<button
			onClick={onClick || undefined}
			aria-label={ariaLabel}
			className={`p-1 text-slate-600 rounded-md ${isActive ? 'hover:bg-slate-100' : 'hover:bg-slate-200'}`}
			type={type}
		>
			{children}
		</button>
	);
};

const EditTodolistForm = ({
	todolist,
	handleEditClick,
	isActive,
}: {
	todolist: TodoList;
	handleEditClick: (val: boolean) => void;
	isActive: boolean;
}) => {
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>({
		defaultValues: {
			title: todolist.title,
		},
	});

	const onSubmit = async (data: { title: string }) => {
		if (todolist.title !== data.title) {
			await updateTodolistAction(todolist.id, data.title);
		}
		handleEditClick(false);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
			<input
				{...register('title')}
				type="text"
				placeholder={todolist.title}
				className="bg-transparent focus:outline-none border-b border-slate-950 my-3 mx-5 w-5/6"
				autoFocus
				defaultValue={todolist.title}
			/>
			<div className="flex items-center gap-2">
				<Button type="submit" ariaLabel="Save New Todolist Title" isActive={isActive}>
					<Check size={15} />
				</Button>

				<Button onClick={() => handleEditClick(false)} ariaLabel="Cancel Editing" isActive={isActive}>
					<X size={15} />
				</Button>
			</div>
		</form>
	);
};

export default memo(TodoListItem);
