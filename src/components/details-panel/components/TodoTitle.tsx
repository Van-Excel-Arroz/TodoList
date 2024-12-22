'use client';

import useSelectedTodoStore from '@/context/SelectedTodoContext';
import EditTodoTitleForm from '../ui/EditTodoTitleForm';

interface TodoTitleProps {
	title: string;
}

export default function TodoTitle({ title }: TodoTitleProps) {
	const { selectedTodo, updateSelectedTodoTitle } = useSelectedTodoStore();

	return (
		<div className="flex items-center gap-4 w-full">
			<EditTodoTitleForm
				title={title}
				todoId={selectedTodo?.id ?? 0}
				updateSelectedTodoTitle={updateSelectedTodoTitle}
			/>
		</div>
	);
}
