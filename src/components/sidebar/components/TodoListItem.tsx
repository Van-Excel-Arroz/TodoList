'use client';

import { memo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import { List } from 'lucide-react';

function TodoListItem({ todolist }: { todolist: TodoList }) {
	const searchParams = useSearchParams();
	const currentId = searchParams.get('id');
	const isSelectedPath = currentId === todolist.id.toString();
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const urlWithSearchParams = localStorage.getItem(`searchParams-${todolist.id}`);

	const handleClick = () => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
		setSelectedTodoId(0);
	};

	return (
		<div
			className={`flex items-center gap-2 relative mx-auto pl-2 py-1 transition-all rounded-md duration-200  ${
				isSelectedPath
					? 'border-slate-500 bg-slate-200'
					: 'border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200'
			}`}
		>
			<List size={20} className="text-slate-600" />

			<Link
				href={urlWithSearchParams || `/tasks/?id=${todolist.id}`}
				onClick={handleClick}
				className={`text-sm lg:text-base flex-1 text-ellipsis py-1 text-nowrap overflow-hidden group-hover:max-w-[calc(100%-60px)] ${
					isSelectedPath ? 'font-bold' : 'font-normal'
				}`}
			>
				{todolist.title}
			</Link>
		</div>
	);
}

export default memo(TodoListItem);
