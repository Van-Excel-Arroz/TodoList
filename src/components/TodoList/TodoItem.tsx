'use client';

import { Todo } from '@/types';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { Check, Circle, CircleCheck } from 'lucide-react';
import { memo, useState } from 'react';

interface TodoItemProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
	const [isChecked, setIsChecked] = useState(false);

	const onChange = () => {
		setIsChecked(prevState => !prevState);
	};

	return (
		<div key={todo.id} className="grid grid-cols-6 ">
			<div className="col-span-4 flex items-center py-2">
				<input type="checkbox" className="hidden peer" checked={isChecked} onChange={() => onChange()} />
				<label className="flex items-center cursor-pointer" onClick={onChange}>
					{isChecked ? (
						<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-sm">
							<Check color="white" size={15} strokeWidth={4} />
						</div>
					) : (
						<div className="border border-black w-5 h-5 rounded-sm"></div>
					)}
				</label>

				<p className={`ml-6 ${isChecked && 'line-through'}`}>{todo.task_text}</p>
				<div className="flex">
					{todo.categories &&
						todo.categories.map(category => (
							<span
								key={category.id}
								className={`text-xs border shadow-md ml-2 rounded py-1 px-2`}
								style={{ color: category.hex_color }}
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
