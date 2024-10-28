'use client';

import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

interface TodoItemProps {
	todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
	return (
		<div key={todo.id} className="grid grid-cols-6 my-3 border border-l-slate-800 px-4 py-2 ">
			<div className="col-span-4">
				<p className="col-span-4 truncate">{todo.task_text}</p>
				<div className="flex">
					{todo.category && (
						<span className="text-xs text-blue-800 border shadow-md rounded mt-2 py-1 px-2">{todo.category}</span>
					)}
				</div>
			</div>

			<p
				className={
					todo.due_datetime && isPast(new Date(todo.due_datetime))
						? 'text-center text-sm flex self-center justify-center text-red-500'
						: 'text-center text-sm flex self-center justify-center'
				}
			>
				{todo.due_datetime
					? isToday(new Date(todo.due_datetime))
						? 'Today' + format(new Date(todo.due_datetime), ` \'at\' h:mm a`)
						: isTomorrow(new Date(todo.due_datetime))
						? 'Tomorrow' + format(new Date(todo.due_datetime), ` \'at\' h:mm a`)
						: format(new Date(todo.due_datetime), `EEE, MMMM d \'at\' h:mm a`)
					: '-'}
			</p>
			<p className="text-center text-sm flex self-center justify-center">
				{formatDistanceToNow(new Date(todo.creation_date).toISOString(), { addSuffix: true })}
			</p>
		</div>
	);
}
