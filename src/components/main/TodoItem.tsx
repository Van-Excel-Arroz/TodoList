'use client';

import { memo } from 'react';
import { Calendar, Check, Tag, Trash2 } from 'lucide-react';
import { isToday, isTomorrow, format, isPast, isThisYear } from 'date-fns';
import { Category, Todo } from '@/types';
import {
	deleteTodoAction,
	updateIsSelectedCategoryColorsAction,
	updateTodoCompletionAction,
} from '@/actions/todolist-action';
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

	const handleDeleteClick = async () => {
		await deleteTodoAction(todo.id, todo.todo_list_id);
		if (isSelected) {
			closeRightSidebar();
			setSelectedTodo(null);
		}
	};

	return (
		<div
			key={todo.id}
			className={`flex cursor-pointer group active:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)] rounded-lg px-2 ${
				isSelected
					? 'bg-slate-200 shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)]'
					: 'hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)]'
			}`}
			onClick={handleTodoClick}
		>
			<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
			<div className="flex items-center py-2 pl-4 w-full">
				<TodoContent
					isCompleted={todo.is_completed}
					task={todo.task_text}
					dueDatetime={todo.due_datetime || ''}
					categories={todo.categories || []}
					handleCategoryClick={handleCategoryClick}
				/>
				<DeleteButton handleDeleteClick={handleDeleteClick} />
			</div>
		</div>
	);
}

export default memo(TodoItem);

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

export const CheckBox = ({ isChecked, handleOnClick }: { isChecked: boolean; handleOnClick: () => void }) => (
	<div className="flex items-center">
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
				<div className="border border-black w-5 h-5 rounded-md active:border-slate-700 ">
					<div className="flex justify-center items-center h-full opacity-0 hover:opacity-80">
						<Check color="black" size={15} />
					</div>
				</div>
			)}
		</button>
	</div>
);

const TodoContent = ({
	isCompleted,
	task,
	dueDatetime,
	categories,
	handleCategoryClick,
}: {
	isCompleted: boolean;
	task: string;
	dueDatetime: string;
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}) => (
	<div className="flex flex-col">
		<p
			className={` ${isCompleted && 'line-through'} ${
				categories.length > 0 || dueDatetime !== '' ? 'text-sm' : 'text-base'
			} text-nowrap overflow-hidden`}
		>
			{task}
		</p>
		<div className="flex items-center gap-1 flex-wrap">
			{dueDatetime && (
				<>
					<Calendar size={12} className="text-slate-800" />
					<DueDate dueDatetime={dueDatetime} textSize="xs" />
				</>
			)}
			{categories.length > 0 && (
				<>
					<Tag size={12} className="text-slate-800 ml-1" />
					<RenderCategories categories={categories} handleCategoryClick={handleCategoryClick} />
				</>
			)}
		</div>
	</div>
);

const RenderCategories = ({
	categories,
	handleCategoryClick,
}: {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}) => (
	<>
		{categories?.map(category => (
			<span
				key={category.id}
				className="text-xs rounded p-1 hover:bg-slate-200 hover:shadow-none active:bg-slate-300"
				style={{ color: category.hex_color }}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					handleCategoryClick(category.category_title);
				}}
			>
				• {category.category_title}
			</span>
		))}
	</>
);

export const DueDate = ({ dueDatetime, textSize = 'xs' }: { dueDatetime: string; textSize?: string }) => (
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
		className="ml-auto justify-end p-1 rounded-md hover:bg-slate-200 opacity-0 group-hover:opacity-100"
		aria-label="Delete Todo"
		onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			handleDeleteClick();
		}}
	>
		<Trash2 size={18} />
	</button>
);
