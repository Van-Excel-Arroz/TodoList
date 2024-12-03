'use client';

import { memo } from 'react';
import { Calendar, Check } from 'lucide-react';
import { isToday, isTomorrow, format, isPast } from 'date-fns';
import { Category, Todo } from '@/types';
import { updateIsSelectedCategoryColorsAction, updateTodoCompletionAction } from '@/actions/todolist-action';
import useRightSidebarStore from '@/context/RightSidebarContext';
import useTodoStore from '@/context/todoContext';

function TodoItem({ todo }: { todo: Todo }) {
	const { openRightSidebar, closeRightSidebar } = useRightSidebarStore();
	const { selectedTodo, setSelectedTodo } = useTodoStore();
	const isSelected = selectedTodo?.id === todo.id;

	const handleTodoClick = () => {
		if (isSelected) {
			closeRightSidebar();
			setSelectedTodo(null);
		} else {
			openRightSidebar();
			setSelectedTodo(todo);
		}
	};

	const handleCheckboxChange = async () => {
		await updateTodoCompletionAction(todo.id, !todo.is_completed, todo.todo_list_id);
		closeRightSidebar();
		setSelectedTodo(null);
	};

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(categoryTitle, true, todo.todo_list_id);
	};

	return (
		<div
			key={todo.id}
			className={`flex cursor-pointer  active:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)] rounded-lg px-2 ${
				isSelected ? 'bg-slate-200' : 'hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)]'
			}`}
			onClick={handleTodoClick}
		>
			<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
			<div className="col-span-9 flex items-center py-2 pl-4">
				{todo.due_datetime ? (
					<TodoWithDueDatetime isCompleted={todo.is_completed} task={todo.task_text} dueDatetime={todo.due_datetime} />
				) : (
					<TodoWithoutDueDatetime isCompleted={todo.is_completed} task={todo.task_text} />
				)}
				{todo.categories && <RenderCategories categories={todo.categories} handleCategoryClick={handleCategoryClick} />}
			</div>
		</div>
	);
}

export default memo(TodoItem);

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

export const CheckBox = ({ isChecked, handleOnClick }: { isChecked: boolean; handleOnClick: () => void }) => (
	<div className="col-end-1 flex items-center">
		<button
			className="flex items-center"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
			aria-label={isChecked ? 'checked' : 'unchecked'}
		>
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

const TodoWithDueDatetime = ({
	isCompleted,
	task,
	dueDatetime,
}: {
	isCompleted: boolean;
	task: string;
	dueDatetime: string;
}) => (
	<div className="flex flex-col">
		<p className={` ${isCompleted && 'line-through'} text-sm text-nowrap`}>{task}</p>
		<div className="flex items-center gap-2">
			<p className="text-xs text-slate-800">
				<Calendar size={12} />
			</p>
			<DueDate dueDatetime={dueDatetime} textSize="xs" />
		</div>
	</div>
);

const TodoWithoutDueDatetime = ({ isCompleted, task }: { isCompleted: boolean; task: string }) => (
	<p className={`py-2 ${isCompleted && 'line-through'} text-sm`}>{task}</p>
);

const RenderCategories = ({
	categories,
	handleCategoryClick,
}: {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}) => (
	<div className="flex flex-wrap gap-1">
		{categories?.map(category => (
			<span
				key={category.id}
				className={`text-xs border shadow-md ml-2 rounded py-1 px-2 hover:bg-slate-100 hover:shadow-none active:bg-slate-200`}
				style={{ color: category.hex_color }}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					handleCategoryClick(category.category_title);
				}}
			>
				{category.category_title}
			</span>
		))}
	</div>
);

export const DueDate = ({ dueDatetime, textSize = 'xs' }: { dueDatetime: string; textSize?: string }) => (
	<p className={`text-${textSize} ${dueDatetime && isPast(dueDatetime) ? 'text-red-500' : 'text-slate-800'}`}>
		{dueDatetime
			? isToday(dueDatetime)
				? 'Today' + format(dueDatetime, ` \'at\' h:mm a`)
				: isTomorrow(dueDatetime)
				? 'Tomorrow' + format(dueDatetime, ` \'at\' h:mm a`)
				: format(dueDatetime, `EEE, MMMM d \'at\' h:mm a`)
			: '-'}
	</p>
);
