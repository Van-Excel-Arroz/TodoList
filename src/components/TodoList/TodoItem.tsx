'use client';

import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { Check } from 'lucide-react';
import { memo, useState } from 'react';
import TodoDueDatetime from './TodoDueDatetime';
import RenderCategories from './RenderCategories';

interface TodoItemProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
	const [isChecked, setIsChecked] = useState(todo.is_completed);

	const handleCheckboxChange = async () => {
		const newIsChecked = !isChecked;
		setIsChecked(newIsChecked);
		await updateTodoCompletionAction(todo.id, newIsChecked, todo.todo_list_id);
	};

	return (
		<div
			key={todo.id}
			className="grid grid-cols-6 pl-2 cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] rounded-lg active:bg-slate-100"
		>
			<div className="col-end-1 flex items-center">
				<label className="flex items-center cursor-pointer" onClick={handleCheckboxChange}>
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
				<RenderCategories categories={todo.categories} />
			</div>
			<TodoDueDatetime dueDatetime={todo.due_datetime} />
			<p className="text-center text-sm flex self-center justify-center text-slate-800">
				{formatDistanceToNow(todo.creation_date, { addSuffix: true }).replace('about ', '')}
			</p>
		</div>
	);
}

export default memo(TodoItem);
