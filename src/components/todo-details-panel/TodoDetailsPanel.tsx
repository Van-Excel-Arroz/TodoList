'use client';

import TodoTitle from './content/TodoTitle';
import TodoDueDate from './content/TodoDueDate';
import TodoCategories from './content/TodoCategories';
import TodoDetailsHeader from './content/TodoDetailsHeader';
import TodoDetailsFooter from './content/TodoDetailsFooter';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import useSelectedTodoStore from '@/context/SelectedTodoContext';

export default function TodoDetailsPanel() {
	const { selectedTodo, setSelectedTodo } = useSelectedTodoStore();
	const { isTodoDetailsPanelOpen, closeTodoDetailsPanel } = useTodoDetailsPanelStore();

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
				className={`fixed lg:relative right-0 top-0 bg-white pb-9 pt-6 border-l border-slate-300 shadow-xl lg:h-[calc(100vh-2.5rem)]  h-screen transition-[width] duration-200 ease-in-out overflow-hidden z-50 backdrop-blur-sm bg-opacity-80 ${
					isTodoDetailsPanelOpen ? 'w-96' : 'w-0'
				}`}
			>
				<div className="flex flex-col gap-4 px-6">
					<TodoDetailsHeader />
					<TodoTitle title={selectedTodo?.task_text ?? ''} isCompleted={selectedTodo?.is_completed ?? false} />
					<TodoDueDate dueDatetime={selectedTodo?.due_datetime ?? ''} />
					<TodoCategories categories={selectedTodo?.categories ?? []} todoId={selectedTodo?.id ?? 0} />
					<TodoDetailsFooter creationDate={selectedTodo?.creation_date ?? ''} todoId={selectedTodo?.id ?? 0} />
				</div>
			</div>
		</>
	);
}
