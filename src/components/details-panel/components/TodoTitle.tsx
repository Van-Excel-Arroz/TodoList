'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoTitle() {
	const { selectedTodo, updateSelectedTodoTitle } = useSelectedTodoStore();
	const { register, handleSubmit, reset, setValue, watch } = useForm<{ title: string }>();
	const { updateTodoTitle } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);

	const onSubmit = async (data: { title: string }) => {
		if (!selectedTodo) return;
		if (selectedTodo.task_text !== data.title) {
			await updateTodoTitleAction(selectedTodo.id, data.title);
			updateSelectedTodoTitle(data.title);
			updateTodoTitle(selectedTodo.id, data.title);
		}
		reset();
		setIsEditing(false);
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setValue('title', selectedTodo?.task_text || '');
			setIsEditing(false);
		}
	};

	const watchedTitle = watch('title');

	useEffect(() => {
		setValue('title', selectedTodo?.task_text || '');
	}, [selectedTodo?.task_text, setValue]);

	useEffect(() => {
		setIsEditing(watchedTitle !== selectedTodo?.task_text);
	}, [watchedTitle, selectedTodo?.task_text]);

	return (
		<div onBlur={handleInputBlur} tabIndex={-1}>
			<form className="flex items-start gap-2 flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between w-full">
					<p className="text-slate-600">Title</p>
					{isEditing && (
						<Button type="submit" ariaLabel="Save New Todo Title">
							<Save size={18} />
						</Button>
					)}
				</div>
				<textarea
					{...register('title')}
					className="rounded-lg py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
					autoFocus
					placeholder={selectedTodo?.task_text}
					defaultValue={selectedTodo?.task_text}
				/>
			</form>
		</div>
	);
}
