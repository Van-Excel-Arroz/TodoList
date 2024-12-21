'use client';

import { memo } from 'react';
import { Calendar, Tag, Trash2 } from 'lucide-react';
import { isToday, isTomorrow, format, isPast, isThisYear } from 'date-fns';
import { Todo } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { deleteTodoAction, updateTodoCompletionAction } from '@/actions/todo-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import CheckBox from '@/components/ui/CheckBox';
import CategoryTags from './ui/CategoryTags';

function TodoItem({ todo }: { todo: Todo }) {
	const { openTodoDetailsPanel, closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { selectedTodo, setSelectedTodo, toggleSelectedTodoCompletion } = useSelectedTodoStore();
	const { deleteTodo, toggleTodoCompletion } = useTodosStore();
	const isSelected = selectedTodo?.id === todo.id;

	const handleTodoClick = () => {
		if (isSelected) {
			closeTodoDetailsPanel();
			setSelectedTodo(null);
		} else {
			openTodoDetailsPanel();
			setSelectedTodo(todo);
		}
	};

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todo.id, !todo.is_completed);
		toggleTodoCompletion(todo.id);
		toggleSelectedTodoCompletion(todo.id);
	};

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(true, categoryTitle, todo.todo_list_id);
	};

	const handleDeleteClick = async () => {
		await deleteTodoAction(todo.id);
		deleteTodo(todo.id);
		if (isSelected) {
			closeTodoDetailsPanel();
			setSelectedTodo(null);
		}
	};
	return (
		<div
			key={todo.id}
			className={`flex flex-col cursor-pointer relative group py-2 mx-4 px-3 active:bg-sky-50 rounded-lg select-none ${
				isSelected ? 'bg-sky-100' : 'bg-white hover:bg-sky-50 '
			}`}
			onClick={handleTodoClick}
		>
			<div className="flex items-center">
				<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
				<p
					className={`pl-2 w-[95%] group-hover:w-11/12 text-nowrap text-ellipsis overflow-hidden ${
						todo.is_completed && 'line-through text-slate-700'
					}
			}`}
				>
					{todo.task_text}
				</p>
				<DeleteButton handleDeleteClick={handleDeleteClick} />
			</div>

			<div className="ml-7 flex items-center gap-1 flex-wrap">
				{todo.due_datetime && (
					<>
						<Calendar size={12} className="text-slate-800" />
						<DueDate dueDatetime={todo.due_datetime} textSize="xs" />
					</>
				)}
				{todo.due_datetime && todo.categories!.length > 0 && <p>•</p>}
				{todo.categories!.length > 0 && (
					<>
						<Tag size={12} className="text-slate-800" />
						<CategoryTags categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
					</>
				)}
			</div>
		</div>
	);
}

export default memo(TodoItem);

interface DueDateProps {
	dueDatetime: string;
	textSize?: string;
}

export const DueDate = ({ dueDatetime, textSize = 'xs' }: DueDateProps) => (
	<p className={`text-${textSize} ${dueDatetime && isPast(dueDatetime) ? 'text-red-500' : 'text-slate-800'}`}>
		{dueDatetime
			? isToday(dueDatetime)
				? 'Today' + format(dueDatetime, ` \'at\' h:mm a`)
				: isTomorrow(dueDatetime)
				? 'Tomorrow' + format(dueDatetime, ` \'at\' h:mm a`)
				: isThisYear(dueDatetime)
				? format(dueDatetime, `EEE, MMMM d \'at\' h:mm a`)
				: format(dueDatetime, `EEE, MMMM d yyyy \'at\' h:mm a`)
			: '-'}
	</p>
);

const DeleteButton = ({ handleDeleteClick }: { handleDeleteClick: () => void }) => (
	<button
		className="absolute right-3 p-1 rounded-md hover:bg-slate-200 opacity-0 group-hover:opacity-100 text-slate-600"
		aria-label="Delete Todo"
		onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			handleDeleteClick();
		}}
	>
		<Trash2 size={18} />
	</button>
);
