'use client';

import { memo } from 'react';
import { Todo } from '@/utils/types';
import {
	updateTodoCompletedAtAction,
	updateTodoCompletionAction,
	updateTodoImportanceAction,
} from '@/actions/todo-action';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import CheckBox from '@/components/ui-shared/CheckBox';
import CategoryTagList from '../todo-list/ui/CategoryTagList';
import DueDate from '../todo-list/ui/DueDate';
import { GripVertical } from 'lucide-react';
import Importance from '@/components/ui-shared/Importance';
import useQueryParams from '@/hooks/useQueryParams';

interface TodoItemProps {
	todo: Todo;
	accentColor: string;
}

function TodoItem({ todo, accentColor }: TodoItemProps) {
	const { selectedTodoId, setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoCompletion, toggleTodoImportance, updateCompletedAt } = useTodosStore();
	const isSelected = selectedTodoId === todo.id;
	const { updateSearchParams, getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [view] = getQueryParam('view');

	const handleTodoClick = () => {
		if (isSelected) {
			setSelectedTodoId(0);
		} else {
			setSelectedTodoId(todo.id);
		}
	};

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todo.id, !todo.is_completed);
		toggleTodoCompletion(todo.id);

		if (!todo.is_completed) {
			const now = new Date().toISOString();
			updateCompletedAt(selectedTodoId, now);
			await updateTodoCompletedAtAction(selectedTodoId, now);
		} else {
			updateCompletedAt(selectedTodoId, null);
			await updateTodoCompletedAtAction(selectedTodoId, null);
		}
	};

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(todo.id, !todo.is_important);
		toggleTodoImportance(todo.id);
	};

	const handleCategoryClick = (categoryTitle: string) => {
		updateSearchParams('filter', `categories:${categoryTitle}`, todolistId);
	};

	return (
		<>
			{view === 'grid' ? (
				<div
					key={todo.id}
					className={`mx-2 grid grid-cols-12 bg-white ring-offset-1 ring-slate-300 border cursor-pointer relative py-[2px] mb-2 px-2 rounded-lg select-none drop-shadow-sm transition-all duration-100 ${
						isSelected ? ` border-slate-500` : ' hover:ring-2 hover:ring-slate-300'
					}`}
					style={{
						borderColor: isSelected ? `${accentColor}80` : '',
					}}
					onClick={handleTodoClick}
				>
					<div className="flex items-center gap-2 col-span-7">
						<div className="flex items-center gap-2">
							<GripVertical
								className="cursor-all-scroll text-slate-500 hover:text-slate-800"
								strokeWidth={1}
								size={20}
							/>
							<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
						</div>
						<p className={`w-[90%] ${todo.is_completed && 'line-through text-slate-600'} lg:text-base text-md`}>
							{todo.task_text}
						</p>
					</div>
					<div className="col-span-1 flex items-center justify-center">
						{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} />}
					</div>
					<div className="col-span-3 flex items-center gap-2 flex-wrap">
						{(todo.categories?.length ?? 0) > 0 && (
							<CategoryTagList categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
						)}
					</div>
					<div className="col-span-1 flex justify-center">
						<Importance isImportant={todo.is_important} handleOnClick={handleImportanceChange} size={22} />
					</div>
				</div>
			) : (
				<div
					key={todo.id}
					className={`flex flex-col border cursor-pointer relative py-1 mb-2 px-3 bg-white rounded-lg select-none drop-shadow-sm transition-all duration-100`}
					style={{
						borderColor: isSelected ? `${accentColor}80` : '',
					}}
					onClick={handleTodoClick}
				>
					<div className="flex items-center">
						<div className="w-15 h-5 flex items-center">
							<GripVertical
								className="cursor-all-scroll mr-3 text-slate-500 hover:text-slate-800"
								strokeWidth={1}
								size={20}
							/>
							<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
						</div>

						<div className="flex flex-col ml-5 w-full ">
							<p
								className={`w-[90%] text-ellipsis overflow-hidden lg:text-base text-md ${
									todo.is_completed && 'line-through text-slate-600'
								}
			}`}
							>
								{todo.task_text}
							</p>
							<div className="flex items-center gap-1 flex-wrap">
								{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} />}
								{todo.due_datetime && (todo.categories || []).length > 0 && <p className="text-slate-600">•</p>}
								{(todo.categories?.length ?? 0) > 0 && (
									<>
										<CategoryTagList categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
									</>
								)}
							</div>
						</div>
						<Importance isImportant={todo.is_important} handleOnClick={handleImportanceChange} />
					</div>
				</div>
			)}
		</>
	);
}

export default memo(TodoItem);
