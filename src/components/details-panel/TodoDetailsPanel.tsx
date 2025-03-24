'use client';

import TodoTitle from './components/TodoTitle';
import TodoDueDate from './components/TodoDueDate';
import TodoCategories from './components/TodoCategories';
import TodoDetailsHeader from './components/TodoDetailsHeader';
import TodoDetailsFooter from './components/TodoDetailsFooter';
import TodoDescription from './components/TodoDescription';
import TodoComplete from './components/TodoComplete';
import TodoImportance from './components/TodoImportance';
import useTodosStore from '@/context/TodosContext';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';

export default function TodoDetailsPanel() {
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { getTodoById } = useTodosStore();
	const todo = getTodoById(selectedTodoId);

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden cursor-pointer z-40 ${
					selectedTodoId ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					setSelectedTodoId(0);
				}}
			/>
			<div
				className={`overflow-y-scroll fixed lg:relative right-0 top-0 bg-white border-l border-slate-300  h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 ${
					selectedTodoId ? 'w-96' : 'w-0'
				}`}
			>
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-4">
						<TodoDetailsHeader />
						<div className="flex items-center justify-between gap-4">
							<TodoComplete isCompleted={todo?.is_completed ?? false} completedAt={todo?.completed_at ?? ''} />
							<TodoImportance isImportant={todo?.is_important ?? false} />
						</div>

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
