'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { TodoList } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodoListsStore from '@/context/TodoListsContext';
import { Button } from '@/components/ui-shared/Button';
import EditTodoListForm from '../ui/EditTodoListForm';

function TodoListItem({ todolist }: { todolist: TodoList }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isSelectedPath = searchParams.get('id') === todolist.id.toString();
	const currentId = searchParams.get('id');
	const [isEditing, setIsEditing] = useState(false);
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { selectedTodo, setSelectedTodo } = useSelectedTodoStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const { deleteTodolist } = useTodoListsStore();

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
		await deleteTodolistAction(todolist.id);
		deleteTodolist(todolist.id);
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
				<EditTodoListForm todolist={todolist} handleEditClick={handleEditClick} />
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

export default memo(TodoListItem);
