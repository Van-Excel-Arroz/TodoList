'use client';

import { memo } from 'react';
import { Calendar, Check, Tag, Trash2 } from 'lucide-react';
import { isToday, isTomorrow, format, isPast, isThisYear } from 'date-fns';
import { Category, Todo } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import useTodoStore from '@/context/TodoContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { deleteTodoAction, updateTodoCompletionAction } from '@/actions/todo-action';

function TodoItem({ todo }: { todo: Todo }) {
	const { openTodoDetailsPanel, closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { selectedTodo, setSelectedTodo } = useTodoStore();
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
		await updateTodoCompletionAction(todo.id, !todo.is_completed, todo.todo_list_id);
		closeTodoDetailsPanel();
		setSelectedTodo(null);
	};

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(true, categoryTitle, todo.todo_list_id);
	};

	const handleDeleteClick = async () => {
		await deleteTodoAction(todo.id, todo.todo_list_id);
		if (isSelected) {
			closeTodoDetailsPanel();
			setSelectedTodo(null);
		}
	};

	return (
		<div
			key={todo.id}
			className={`flex cursor-pointer group active:bg-sky-50 rounded-lg px-2 ${
				isSelected ? 'bg-sky-100 ' : 'hover:bg-sky-50'
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
			aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
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
			{dueDatetime && categories.length > 0 && <p>•</p>}
			{categories.length > 0 && (
				<>
					<Tag size={12} className="text-slate-800" />
					<RenderCategoryTags categories={categories} handleCategoryClick={handleCategoryClick} />
				</>
			)}
		</div>
	</div>
);

const RenderCategoryTags = ({
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
				className="text-xs rounded-md flex items-center gap-1 hover:outline hover:outline-1"
				style={{
					color: category.hex_color,
					backgroundColor: `${category.hex_color}20`,
					padding: '2px',
				}}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					handleCategoryClick(category.category_title);
				}}
			>
				<p className="pb-0.5 text-xs">⦿</p>
				<p>{category.category_title}</p>
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
		className="ml-auto justify-end p-1 rounded-md hover:bg-slate-200 opacity-0 group-hover:opacity-100 text-slate-600"
		aria-label="Delete Todo"
		onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			handleDeleteClick();
		}}
	>
		<Trash2 size={18} />
	</button>
);
