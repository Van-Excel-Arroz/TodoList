'use client';

import { updateIsSelectedCategoryColorsAction, updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { memo } from 'react';
import TodoDueDatetime from './TodoDueDatetime';
import RenderCategories from './RenderCategories';
import CheckBox from './CheckBox';

function TodoItem({ todo }: { todo: Todo }) {
	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todo.id, !todo.is_completed, todo.todo_list_id);
	};

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(categoryTitle, true, todo.todo_list_id);
	};

	return (
		<div
			key={todo.id}
			className="grid grid-cols-12 cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] rounded-lg px-2"
		>
			<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
			<div className="col-span-8 flex items-center py-2">
				<p className={`ml-6 ${todo.is_completed && 'line-through'}`}>{todo.task_text}</p>
				<RenderCategories categories={todo.categories} handleCategoryClick={handleCategoryClick} />
			</div>
			<TodoDueDatetime dueDatetime={todo.due_datetime} />
			<p className="col-span-2 text-center ml-3 text-sm flex self-center justify-center text-slate-800 ">
				{formatDistanceToNow(todo.creation_date, { addSuffix: true }).replace('about ', '')}
			</p>
		</div>
	);
}

export default memo(TodoItem);
