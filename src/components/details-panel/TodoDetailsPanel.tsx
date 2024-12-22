'use client';

import TodoTitle from './components/TodoTitle';
import TodoDueDate from './components/TodoDueDate';
import TodoCategories from './components/TodoCategories';
import TodoDetailsHeader from './components/TodoDetailsHeader';
import TodoDetailsFooter from './components/TodoDetailsFooter';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import CheckBox from '../ui-shared/CheckBox';
import useTodosStore from '@/context/TodosContext';
import { updateTodoCompletionAction } from '@/actions/todo-action';

export default function TodoDetailsPanel() {
	const { selectedTodo, setSelectedTodo, toggleSelectedTodoCompletion } = useSelectedTodoStore();
	const { isTodoDetailsPanelOpen, closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { toggleTodoCompletion } = useTodosStore();

	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed);
		toggleTodoCompletion(selectedTodo.id);
		toggleSelectedTodoCompletion(selectedTodo.id);
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden cursor-pointer z-40 ${
					isTodoDetailsPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					closeTodoDetailsPanel();
					setSelectedTodo(null);
				}}
			/>
			<div
				className={`fixed lg:relative right-0 top-0 bg-white pb-9 border-l border-slate-300 shadow-xl lg:h-[calc(100vh-2.5rem)]  h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 backdrop-blur-sm bg-opacity-80 ${
					isTodoDetailsPanelOpen ? 'w-96' : 'w-0'
				}`}
			>
				<div className="flex flex-col gap-4 px-6">
					<TodoDetailsHeader todoId={selectedTodo?.id ?? 0} />
					<CheckBox isChecked={selectedTodo?.is_completed ?? false} handleOnClick={handleCheckboxChange} />
					<TodoTitle title={selectedTodo?.task_text ?? ''} />
					<TodoDueDate dueDatetime={selectedTodo?.due_datetime ?? ''} todoId={selectedTodo?.id ?? 0} />
					<TodoCategories categories={selectedTodo?.categories ?? []} todoId={selectedTodo?.id ?? 0} />
					<TodoDetailsFooter creationDate={selectedTodo?.creation_date ?? ''} />
				</div>
			</div>
		</>
	);
}
