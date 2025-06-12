'use client';

import { memo } from 'react';
import { Todo } from '@/utils/types';
import {
	deleteTodoAction,
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
import useTodoListsStore from '@/context/TodoListsContext';

const COMPLETED_TASKS = 'Hide immediately';

function TodoItem({ todo }: { todo: Todo }) {
	const { selectedTodoId, setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoCompletion, toggleTodoImportance, updateCompletedAt, deleteTodo } = useTodosStore();
	const isSelected = selectedTodoId === todo.id;
	const { updateSearchParams, getQueryParam } = useQueryParams();
	const [view] = getQueryParam('view');
	const { getTodoListSettingValue } = useTodoListsStore();
	const accentColor = getTodoListSettingValue('appearance', 'accent', todo.todo_list_id) ?? '#6b7280';
	const dueDateFormat = getTodoListSettingValue('behavior', 'dueDateFormat', todo.todo_list_id) ?? '';
	const completedTasks = getTodoListSettingValue('behavior', 'completedTasks', todo.todo_list_id) ?? '';

	const handleTodoClick = () => {
		if (isSelected) {
			setSelectedTodoId(0);
		} else {
			setSelectedTodoId(todo.id);
		}
	};

	const handleCheckboxChange = async () => {
		if (completedTasks === COMPLETED_TASKS && !todo.is_completed) {
			await deleteTodoAction(todo.id);
			deleteTodo(todo.id);
		} else {
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
		}
	};

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(todo.id, !todo.is_important);
		toggleTodoImportance(todo.id);
	};

	const handleCategoryClick = (categoryTitle: string) => {
		updateSearchParams('filter', `categories:${categoryTitle}`, `${todo.todo_list_id}`);
	};

	return (
		<>
			{view === 'grid' ? (
				<div
					key={todo.id}
					className={`grid grid-cols-12 bg-white ring-offset-1 ring-slate-300 cursor-pointer relative py-[2px] m-2 px-2 rounded-lg select-none drop-shadow-sm transition-all duration-100 hover:ring-2`}
					style={{
						borderColor: isSelected ? `${accentColor}80` : '',
					}}
					onClick={handleTodoClick}
				>
					<div className="flex items-center gap-2 col-span-6">
						<div className="flex items-center gap-2">
							<GripVertical
								className="cursor-all-scroll text-slate-500 hover:text-slate-800"
								strokeWidth={1}
								size={20}
								color={accentColor}
							/>
							<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} accentColor={accentColor} />
						</div>
						<p className={`w-[90%] ${todo.is_completed && 'line-through text-slate-600'} lg:text-base text-md`}>
							{todo.task_text}
						</p>
					</div>
					<div className="col-span-2 flex items-center justify-center">
						{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} dueDateFormat={dueDateFormat} />}
					</div>
					<div className="col-span-3 flex items-center gap-2 flex-wrap">
						{(todo.categories?.length ?? 0) > 0 && (
							<CategoryTagList categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
						)}
					</div>
					<div className="col-span-1 flex justify-center">
						<Importance
							isImportant={todo.is_important}
							handleOnClick={handleImportanceChange}
							size={22}
							accentColor={accentColor}
						/>
					</div>
				</div>
			) : (
				<div
					key={todo.id}
					className={`flex flex-col mx-2 cursor-pointer relative py-1 m-2 px-3 bg-white rounded-lg select-none drop-shadow-sm transition-all duration-100 ring-slate-300 ring-offset-2 hover:ring-2`}
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
								color={accentColor}
							/>
							<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} accentColor={accentColor} />
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
								{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} dueDateFormat={dueDateFormat} />}
								{todo.due_datetime && (todo.categories || []).length > 0 && <p className="text-slate-600">•</p>}
								{(todo.categories?.length ?? 0) > 0 && (
									<>
										<CategoryTagList categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
									</>
								)}
							</div>
						</div>
						<Importance
							isImportant={todo.is_important}
							handleOnClick={handleImportanceChange}
							accentColor={accentColor}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default memo(TodoItem);
