'use client';

import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { Check } from 'lucide-react';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoItemProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
	const [isChecked, setIsChecked] = useState(false);
	const { register, handleSubmit } = useForm();

	const onChange = () => {
		setIsChecked(prevState => !prevState);
	};

	const onSubmit = async (data: any) => {
		await updateTodoCompletionAction(todo.id, data.isCompleted, todo.todo_list_id);
	};

	return (
		<div
			key={todo.id}
			className="grid grid-cols-6 pl-2 cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] rounded-lg active:bg-slate-100"
		>
			<div className="col-end-1 flex items-center">
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="checkbox" checked={isChecked} {...register('isCompleted')} />
				</form>
				<label className="flex items-center cursor-pointer" onClick={onChange}>
					{isChecked ? (
						<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-md">
							<Check color="white" size={15} />
						</div>
					) : (
						<div className="border border-black w-5 h-5 rounded-md hover:border-slate-600 active:border-slate-400"></div>
					)}
				</label>
			</div>

			<div className="col-span-4 flex items-center py-2 ">
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
					todo.due_datetime && isPast(todo.due_datetime)
						? 'text-center text-sm flex self-center justify-center text-red-500'
						: 'text-center text-sm flex self-center justify-center text-slate-800'
				}
			>
				{todo.due_datetime
					? isToday(todo.due_datetime)
						? 'Today' + format(todo.due_datetime, ` \'at\' h:mm a`)
						: isTomorrow(todo.due_datetime)
						? 'Tomorrow' + format(todo.due_datetime, ` \'at\' h:mm a`)
						: format(todo.due_datetime, `EEE, MMMM d \'at\' h:mm a`)
					: '-'}
			</p>
			<p className="text-center text-sm flex self-center justify-center text-slate-800">
				{formatDistanceToNow(todo.creation_date, { addSuffix: true }).replace('about ', '')}
			</p>
		</div>
	);
}

export default memo(TodoItem);
