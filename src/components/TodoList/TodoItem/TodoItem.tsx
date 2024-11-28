'use client';

import { updateIsSelectedCategoryColorsAction, updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
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
			<div className="col-span-9 flex items-center py-2">
				<div className="flex flex-col ml-6">
					<p className={` ${todo.is_completed && 'line-through'} text-sm`}>{todo.task_text}</p>
					<TodoDueDatetime dueDatetime={todo.due_datetime} />
				</div>
				{/* {todo.due_datetime} */}
				<RenderCategories categories={todo.categories} handleCategoryClick={handleCategoryClick} />
			</div>
		</div>
	);
}

export default memo(TodoItem);
