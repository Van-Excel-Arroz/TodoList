'use client';

import { updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { memo, useState } from 'react';
import TodoDueDatetime from './TodoDueDatetime';
import RenderCategories from './RenderCategories';
import CheckBox from './CheckBox';

function TodoItem({ todo }: { todo: Todo }) {
	const [isChecked, setIsChecked] = useState(todo.is_completed);

	const handleCheckboxChange = async () => {
		const newIsChecked = !isChecked;
		setIsChecked(newIsChecked);
		await updateTodoCompletionAction(todo.id, newIsChecked, todo.todo_list_id);
	};

	return (
		<div
			key={todo.id}
			className="grid grid-cols-6 pl-2 cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] rounded-lg"
		>
			<CheckBox isChecked={isChecked} handleOnClick={handleCheckboxChange} />
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
