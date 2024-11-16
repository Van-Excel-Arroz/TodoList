'use client';

import { Todo } from '@/types';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { memo } from 'react';

interface TodoItemProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
	console.log(todo.categories);
	return (
		<div key={todo.id} className="grid grid-cols-6 my-3 border border-l-slate-800 px-4 py-2 bg-white ">
			<div className="col-span-4">
				<p className="col-span-4 truncate">{todo.task_text}</p>
				<div className="flex">
					{todo.categories &&
						todo.categories.map(category => (
							<span
								className={`text-xs text-blue-800 border shadow-md rounded mt-2 py-1 px-2 text-[${category.hex_color}]`}
							>
								{category.category_title}
							</span>
						))}
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

export default memo(TodoItem);
