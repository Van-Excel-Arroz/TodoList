'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { TodoList } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoListsStore from '@/context/TodoListsContext';
import { Button } from '@/components/ui-shared/Button';
import EditTodoListForm from '../ui/EditTodoListForm';

function TodoListItem({ todolist }: { todolist: TodoList }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentId = searchParams.get('id');
	const isSelectedPath = currentId === todolist.id.toString();
	const [isEditing, setIsEditing] = useState(false);
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const { deleteTodolist } = useTodoListsStore();
	const urlWithSearchParams = localStorage.getItem(`searchParams-${todolist.id}`);

	const handleClick = () => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
		setSelectedTodoId(0);
	};

	const handleEdit = (val: boolean) => {
		setIsEditing(val);
	};

	const handleOnSubmit = async () => {
		await deleteTodolistAction(todolist.id);
		deleteTodolist(todolist.id);
		if (currentId === todolist.id.toString()) {
			setSelectedTodoId(0);
			router.push('/tasks/');
		}
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleEdit(false);
		}
	};

	return (
		<div
			className={`flex items-center pr-5 ml-5 group relative w-11/12 mx-auto pl-2 py-1  ${
				isSelectedPath
					? 'border-l-4  border-slate-500 bg-slate-200 '
					: 'border-l-4  border-slate-200 bg-slate-100 hover:border-slate-300 active:bg-slate-200'
			}`}
			onBlur={handleInputBlur}
			tabIndex={-1}
		>
			{isEditing ? (
				<EditTodoListForm todolist={todolist} handleEditClick={handleEdit} />
			) : (
				<Link
					href={urlWithSearchParams || `/tasks/?id=${todolist.id}`}
					onClick={handleClick}
					className={`text-sm lg:text-base flex-1 text-ellipsis py-1 text-nowrap overflow-hidden group-hover:max-w-[calc(100%-60px)] ${
						isSelectedPath ? 'font-bold' : 'font-normal'
					}`}
				>
					{todolist.title}
				</Link>
			)}

			{!isEditing && (
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 absolute right-5">
					<Button onClick={() => handleEdit(true)} ariaLabel="Edit Todolist Title">
						<Pencil size={15} />
					</Button>
					<Button type="submit" ariaLabel="Delete Todolist" onClick={handleOnSubmit}>
						<Trash2 size={15} />
					</Button>
				</div>
			)}
		</div>
	);
}

export default memo(TodoListItem);
