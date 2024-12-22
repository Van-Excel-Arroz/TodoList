'use client';

import useSelectedTodoStore from '@/context/SelectedTodoContext';
import EditTodoTitleForm from '../ui/EditTodoTitleForm';

interface TodoTitleProps {
	title: string;
}

export default function TodoTitle({ title }: TodoTitleProps) {
	const { selectedTodo, updateSelectedTodoTitle } = useSelectedTodoStore();

	return (
		<div className="flex items-start gap-2 flex-col w-full">
			<p className="text-slate-600">Title</p>
			<EditTodoTitleForm
				title={title}
				todoId={selectedTodo?.id ?? 0}
				updateSelectedTodoTitle={updateSelectedTodoTitle}
			/>
		</div>
	);
}
