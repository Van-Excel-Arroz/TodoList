'use client';

import { updateTodoCompletionAction } from '@/actions/todo-action';

import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import EditTodoTitleForm from '../ui/EditTodoTitleForm';
import CheckBox from '@/components/ui-shared/CheckBox';
import { Button } from '@/components/ui-shared/Button';

interface TodoTitleProps {
	title: string;
	isCompleted: boolean;
}

export default function TodoTitle({ title, isCompleted }: TodoTitleProps) {
	const { selectedTodo, toggleSelectedTodoCompletion, updateSelectedTodoTitle } = useSelectedTodoStore();
	const { toggleTodoCompletion } = useTodosStore();

	const handleCheckboxChange = async () => {
		if (!selectedTodo) return;
		await updateTodoCompletionAction(selectedTodo.id, !selectedTodo.is_completed);
		toggleTodoCompletion(selectedTodo.id);
		toggleSelectedTodoCompletion(selectedTodo.id);
	};

	return (
		<div className="flex items-center gap-4 w-full">
			<CheckBox isChecked={isCompleted} handleOnClick={handleCheckboxChange} />
			<EditTodoTitleForm
				title={title}
				todoId={selectedTodo?.id ?? 0}
				updateSelectedTodoTitle={updateSelectedTodoTitle}
			/>
		</div>
	);
}
