'use client';

import TodoTitle from './components/TodoTitle';
import TodoDueDate from './components/TodoDueDate';
import TodoCategories from './components/TodoCategories';
import TodoDetailsHeader from './components/TodoDetailsHeader';
import TodoDetailsFooter from './components/TodoDetailsFooter';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import TodoDescription from './components/TodoDescription';
import TodoComplete from './components/TodoComplete';
import TodoImportance from './components/TodoImportance';
import useTodosStore from '@/context/TodosContext';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';

export default function TodoDetailsPanel() {
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { getTodoById } = useTodosStore();
	const todo = getTodoById(selectedTodoId);
	const { isTodoDetailsPanelOpen, closeTodoDetailsPanel } = useTodoDetailsPanelStore();

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden cursor-pointer z-40 ${
					isTodoDetailsPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					closeTodoDetailsPanel();
					setSelectedTodoId(0);
				}}
			/>
			<div
				className={`overflow-y-scroll fixed lg:relative right-0 top-0 bg-white border-l border-slate-300 lg:h-[calc(100vh-2.5rem)]  h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 backdrop-blur-sm bg-opacity-80 ${
					isTodoDetailsPanelOpen ? 'w-96' : 'w-0'
				}`}
			>
				<div className="flex flex-col justify-between px-6 h-full">
					<div className="flex flex-col gap-4">
						<TodoDetailsHeader />
						<TodoComplete isCompleted={todo?.is_completed ?? false} />
						<TodoImportance isImportant={todo?.is_important ?? false} />
						<TodoTitle title={todo?.task_text ?? ''} />
						<TodoDueDate dueDate={todo?.due_datetime ?? ''} />
						<TodoCategories categories={todo?.categories ?? []} todolistId={todo?.todo_list_id ?? 0} />
						<TodoDescription description={todo?.description ?? ''} />
					</div>
					<TodoDetailsFooter creationDate={todo?.creation_date ?? ''} />
				</div>
			</div>
		</>
	);
}
