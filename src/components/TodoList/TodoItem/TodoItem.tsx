'use client';

import { updateIsSelectedCategoryColorsAction, updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { memo } from 'react';
import TodoDueDatetime from './TodoDueDatetime';
import RenderCategories from './RenderCategories';
import CheckBox from './CheckBox';
import { Trash2 } from 'lucide-react';

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
			className="grid grid-cols-[auto_1fr_auto] gap-2 items-center pl-2 cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] rounded-lg"
		>
			<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
			<div className="flex items-center py-2">
				<p className={`${todo.is_completed && 'line-through'}`}>{todo.task_text}</p>
				<RenderCategories categories={todo.categories} handleCategoryClick={handleCategoryClick} />
			</div>
			<div className="flex flex-row items-center">
				<TodoDueDatetime dueDatetime={todo.due_datetime} />
				<p className="text-center text-sm text-slate-800">
					{formatDistanceToNow(todo.creation_date, { addSuffix: true }).replace('about ', '')}
				</p>
				<button className="text-slate-800">
					<Trash2 size={18} />
				</button>
			</div>
		</div>
	);
}

export default memo(TodoItem);
