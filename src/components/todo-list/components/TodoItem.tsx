'use client';

import { memo } from 'react';
import { Todo } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { deleteTodoAction, updateTodoCompletionAction } from '@/actions/todo-action';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import CheckBox from '@/components/ui-shared/CheckBox';
import CategoryTags from '../ui/CategoryTags';
import DueDate from '../ui/DueDate';
import DeleteTodoButton from '../ui/DeleteTodoButton';
import { GripVertical, Star } from 'lucide-react';

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
			className={`flex flex-col border cursor-pointer relative group py-1 mb-2 mx-4 px-3 active:bg-sky-50 rounded-lg select-none ${
				isSelected ? 'bg-sky-100 border-slate-300' : 'bg-white hover:bg-sky-50 hover:border-slate-300 '
			}`}
			onClick={handleTodoClick}
		>
			<div className="flex items-center">
				<div className="w-15 h-5 flex items-center">
					<GripVertical className="cursor-all-scroll mr-3" strokeWidth={1} size={20} />
					<CheckBox isChecked={todo.is_completed} handleOnClick={handleCheckboxChange} />
				</div>

				<div className="flex flex-col ml-5 w-full ">
					<p
						className={`w-[90%] text-ellipsis overflow-hidden ${todo.is_completed && 'line-through text-slate-700'}
			}`}
					>
						{todo.task_text}
					</p>
					<div className="flex items-center gap-1 flex-wrap">
						{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} textSize="xs" />}
						{todo.due_datetime && todo.categories!.length > 0 && <p>•</p>}
						{todo.categories!.length > 0 && (
							<>
								<CategoryTags categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
							</>
						)}
					</div>
				</div>

				{/* <DeleteTodoButton handleDeleteClick={handleDeleteClick} /> */}
				<div className="absolute right-5">
					<Star strokeWidth={1} size={20} />
				</div>
			</div>
		</div>
	);
}

export default memo(TodoItem);
