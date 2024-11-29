'use client';

import { updateIsSelectedCategoryColorsAction, updateTodoCompletionAction } from '@/actions/todolist-action';
import { Todo } from '@/types';
import { memo } from 'react';
import TodoDueDatetime from './TodoDueDatetime';
import RenderCategories from './RenderCategories';
import { Check } from 'lucide-react';

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
			<div className="col-span-9 flex items-center py-2 pl-4">
				{todo.due_datetime ? (
					<div className="flex flex-col">
						<p className={` ${todo.is_completed && 'line-through'} text-sm`}>{todo.task_text}</p>
						<TodoDueDatetime dueDatetime={todo.due_datetime} />
					</div>
				) : (
					<p className={`py-2 ${todo.is_completed && 'line-through'} text-sm`}>{todo.task_text}</p>
				)}
				<RenderCategories categories={todo.categories} handleCategoryClick={handleCategoryClick} />
			</div>
		</div>
	);
}

const CheckBox = ({ isChecked, handleOnClick }: { isChecked: boolean; handleOnClick: () => void }) => (
	<div className="col-end-1 flex items-center">
		<button className="flex items-center" onClick={handleOnClick} aria-label={isChecked ? 'checked' : 'unchecked'}>
			{isChecked ? (
				<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-md hover:bg-slate-800 active:bg-slate-700">
					<Check color="white" size={15} />
				</div>
			) : (
				<div className="border border-black w-5 h-5 rounded-md hover:border-slate-600 active:border-slate-400"></div>
			)}
		</button>
	</div>
);

export default memo(TodoItem);
