'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoTitle({ title }: { title: string }) {
	const { selectedTodo, updateSelectedTodoTitle } = useSelectedTodoStore();
	const { updateTodoTitle } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ title: string }>({
		defaultValues: { title: selectedTodo?.task_text ?? '' },
	});

	useEffect(() => {
		reset({ title: selectedTodo?.task_text ?? '' });
		setIsEditing(false);
	}, [selectedTodo, reset]);

	if (!selectedTodo) return null;

	const onSubmit = async (data: { title: string }) => {
		if (!data.title.trim()) return;
		if (selectedTodo.task_text !== data.title) {
			await updateTodoTitleAction(selectedTodo.id, data.title);
			updateTodoTitle(selectedTodo.id, data.title);
			updateSelectedTodoTitle(data.title);
		}
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setIsEditing(e.target.value !== selectedTodo.task_text);
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			reset();
			setIsEditing(false);
		}
	};

	return (
		<div onBlur={handleInputBlur} tabIndex={-1}>
			<form className="flex items-start flex-col w-full focus:outline-none" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between w-full">
					<p className="text-slate-600 pb-2">Title</p>
					{isEditing && (
						<Button type="submit" ariaLabel="Save New Todo Title">
							<Save size={18} />
						</Button>
					)}
				</div>
				<textarea
					{...register('title')}
					className="rounded-lg py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
					aria-label="Todo Title Input"
					placeholder={selectedTodo?.task_text}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
