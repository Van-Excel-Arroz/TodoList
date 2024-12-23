'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoTitle() {
	const { selectedTodo } = useSelectedTodoStore();
	const { register, handleSubmit, reset } = useForm<{ title: string }>({
		defaultValues: { title: selectedTodo?.task_text || '' },
	});
	const { updateTodoTitle } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);

	const onSubmit = async (data: { title: string }) => {
		if (!selectedTodo) return;
		if (!data.title.trim()) return;
		if (selectedTodo.task_text !== data.title) {
			await updateTodoTitleAction(selectedTodo.id, data.title);
			updateTodoTitle(selectedTodo.id, data.title);
		}
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setIsEditing(e.target.value !== selectedTodo?.task_text);
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			reset(); // Resets the form to the initial value
			setIsEditing(false);
		}
	};

	useEffect(() => {
		reset({ title: selectedTodo?.task_text || '' }); // Update form value when selectedTodo changes
		setIsEditing(false); // Reset editing state when a new todo is selected
	}, [selectedTodo, reset]);

	return (
		<div onBlur={handleInputBlur} tabIndex={-1}>
			<form className="flex items-start flex-col w-full focus:outline-none" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between w-full">
					<p className="text-slate-600 py-2">Title</p>
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
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
