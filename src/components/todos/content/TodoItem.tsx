'use client';

import { memo } from 'react';
import { Calendar, Check, Tag, Trash2 } from 'lucide-react';
import { isToday, isTomorrow, format, isPast, isThisYear } from 'date-fns';
import { Category, Todo } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { deleteTodoAction, updateTodoCompletionAction } from '@/actions/todo-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

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
			className={`flex flex-col cursor-pointer relative group px-5 py-2 mx-2 active:bg-sky-50 rounded-lg ${
				isSelected ? 'bg-sky-100' : 'bg-white hover:bg-sky-50 '
			}`}
			onClick={handleTodoClick}
		>
			<div className="flex items-center">
				<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
				<div className="flex items-center pl-2 w-full">
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
						<RenderCategoryTags categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
					</>
				)}
			</div>
		</div>
	);
}

export default memo(TodoItem);

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
}

export const CheckBox = ({ isChecked, handleOnClick }: CheckBoxProps) => (
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

interface TodoContentProps {
	isCompleted: boolean;
	task: string;
	dueDatetime: string;
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}

const TodoContent = ({ isCompleted, task, dueDatetime, categories, handleCategoryClick }: TodoContentProps) => (
	<div className="flex flex-col select-none w-[95%] group-hover:w-11/12">
		<p
			className={`text-nowrap text-ellipsis overflow-hidden text-lg 12 ${isCompleted && 'line-through text-slate-700'}
			}`}
		>
			{task}
		</p>
	</div>
);

interface RenderCategoryTagsProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}

const RenderCategoryTags = ({ categories, handleCategoryClick }: RenderCategoryTagsProps) => (
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
		className="absolute right-5 p-1 rounded-md hover:bg-slate-200 opacity-0 group-hover:opacity-100 text-slate-600"
		aria-label="Delete Todo"
		onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			handleDeleteClick();
		}}
	>
		<Trash2 size={18} />
	</button>
);
