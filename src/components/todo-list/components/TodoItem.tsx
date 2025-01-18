'use client';

import { memo } from 'react';
import { Todo } from '@/types';
import { deleteTodoAction, updateTodoCompletionAction, updateTodoImportanceAction } from '@/actions/todo-action';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import CheckBox from '@/components/ui-shared/CheckBox';
import CategoryTags from '../ui/CategoryTags';
import DueDate from '../ui/DueDate';
import { GripVertical } from 'lucide-react';
import Importance from '@/components/ui-shared/Importance';
import useQueryParams from '@/hooks/useQueryParams';

function TodoItem({ todo }: { todo: Todo }) {
	const { selectedTodoId, setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoCompletion, toggleTodoImportance } = useTodosStore();
	const isSelected = selectedTodoId === todo.id;
	const { updateSearchParams } = useQueryParams();

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
			// add completed_at
		} else {
			// set completed_at to null
		}
	};

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(todo.id, !todo.is_important);
		toggleTodoImportance(todo.id);
	};

	const handleCategoryClick = (categoryTitle: string) => {
		updateSearchParams('filter', `categories:${categoryTitle}`);
	};
	return (
		<div
			key={todo.id}
			className={`flex flex-col border cursor-pointer relative py-1 mb-2 mx-4 px-3 bg-white rounded-lg select-none ${
				isSelected ? ' border-slate-400' : ' hover:border-slate-300 '
			}`}
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
						className={`w-[90%] text-ellipsis overflow-hidden ${todo.is_completed && 'line-through text-slate-700'}
			}`}
					>
						{todo.task_text}
					</p>
					<div className="flex items-center gap-1 flex-wrap">
						{todo.due_datetime && <DueDate dueDatetime={todo.due_datetime} textSize="xs" />}
						{todo.due_datetime && todo.categories!.length > 0 && <p>•</p>}
						{(todo.categories?.length ?? 0) > 0 && (
							<>
								<CategoryTags categories={todo.categories!} handleCategoryClick={handleCategoryClick} />
							</>
						)}
					</div>
				</div>
				<Importance isImportant={todo.is_important} handleOnClick={handleImportanceChange} />
			</div>
		</div>
	);
}

export default memo(TodoItem);
