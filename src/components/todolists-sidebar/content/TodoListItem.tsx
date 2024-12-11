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
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';

function TodoListItem({ todolist }: { todolist: TodoList }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isSelectedPath = searchParams.get('id') === todolist.id.toString();
	const currentId = searchParams.get('id');
	const [isEditing, setIsEditing] = useState(false);
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();

	const handleTodoListClick = () => {
		closeTodoDetailsPanel();
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
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

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleEditClick(false);
		}
	};

	return (
		<div
			className={`flex items-center pr-5 ml-5 group relative w-11/12 pl-4  ${
				isSelectedPath ? 'border-l-4  border-slate-400' : 'border-l-4  border-slate-200 hover:border-slate-300'
			}`}
			onBlur={handleInputBlur}
			tabIndex={-1}
		>
			{isEditing ? (
				<EditTodolistForm todolist={todolist} handleEditClick={handleEditClick} isActive={isSelectedPath} />
			) : (
				<Link
					href={`/tasks/?id=${todolist.id}`}
					onClick={handleTodoListClick}
					className={`text-sm lg:text-base flex-1 text-ellipsis py-1 text-nowrap overflow-hidden group-hover:max-w-[calc(100%-60px)] ${
						isSelectedPath ? 'font-bold' : 'font-normal'
					}`}
				>
					{todolist.title}
				</Link>
			)}

			{!isEditing && (
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 absolute right-5">
					<Button onClick={() => handleEditClick(true)} ariaLabel="Edit Todolist Title">
						<Pencil size={15} />
					</Button>
					<Button type="submit" ariaLabel="Delete Todolist" onClick={onSubmit}>
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

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void | Promise<void>;
	type?: 'submit';
	ariaLabel: string;
}

const Button = ({ children, onClick, type, ariaLabel }: ButtonProps) => {
	return (
		<button
			onClick={onClick || undefined}
			aria-label={ariaLabel}
			className="p-1 text-slate-600 rounded-md hover:bg-slate-200"
			type={type}
		>
			{children}
		</button>
	);
};

interface EditTodolistFormProps {
	todolist: TodoList;
	handleEditClick: (val: boolean) => void;
	isActive: boolean;
}

const EditTodolistForm = ({ todolist, handleEditClick, isActive }: EditTodolistFormProps) => {
	const { register, handleSubmit, reset } = useForm<{
		title: string;
	}>();

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
				className="text-sm lg:text-base bg-transparent focus:outline-none border-b border-slate-950 my-1 mr-2 w-3/4 "
				autoFocus
				defaultValue={todolist.title}
			/>
			<div className="flex items-center gap-2">
				<Button type="submit" ariaLabel="Save New Todolist Title">
					<Check size={15} />
				</Button>

				<Button onClick={() => handleEditClick(false)} ariaLabel="Cancel Editing">
					<X size={15} />
				</Button>
			</div>
		</form>
	);
};

export default memo(TodoListItem);
