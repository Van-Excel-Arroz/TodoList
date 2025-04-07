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
import Selection from '../ui-shared/Selection';
import { useState } from 'react';

const sections = ['Details', 'Activity'];

export default function TodoDetailsPanel() {
	const { setSelectedTodoId, selectedTodoId } = useSelectedTodoIdStore();
	const { getTodoById } = useTodosStore();
	const [section, setSection] = useState(sections[0]);
	const isOpen = !!selectedTodoId;
	const todo = isOpen ? getTodoById(selectedTodoId) : null;

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden cursor-pointer z-40 ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					setSelectedTodoId(0);
				}}
			/>
			<div
				className={`flex flex-col fixed lg:relative right-0 top-0 bg-white border-l border-slate-300  h-screen transition-[width] duration-200 ease-in-out z-50 ${
					isOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-10 '
				}
				}`}
			>
				<TodoDetailsHeader />
				<div className="flex-1 px-6 space-y-4 pt-4">
					<Selection options={sections} selectedOption={section} setSelectedOption={setSection} />
					<div className="flex items-center justify-between gap-4">
						<TodoComplete isCompleted={todo?.is_completed ?? false} completedAt={todo?.completed_at ?? ''} />
						<TodoImportance isImportant={todo?.is_important ?? false} />
					</div>

					<TodoTitle title={todo?.task_text ?? ''} />
					<TodoDueDate dueDate={todo?.due_datetime ?? ''} />
					<TodoCategories categories={todo?.categories ?? []} />
					<TodoDescription description={todo?.description ?? ''} />
				</div>
				<TodoDetailsFooter creationDate={todo?.creation_date ?? ''} />
			</div>
		</>
	);
}
