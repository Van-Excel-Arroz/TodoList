'use client';

import { updateTodoDescriptionAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoDescription({ description }: { description: string }) {
	const { selectedTodo } = useSelectedTodoStore();
	const { updateDescription } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ description: string }>({
		defaultValues: { description: description },
	});

	useEffect(() => {
		reset({ description: description });
		setIsEditing(false);
	}, [selectedTodo, reset]);

	if (!selectedTodo) return null;

	const onSubmit = async (data: { description: string }) => {
		if (!data.description.trim()) {
			await updateTodoDescriptionAction(selectedTodo.id, null);
			updateDescription(selectedTodo.id, null);
		} else if (description !== data.description) {
			await updateTodoDescriptionAction(selectedTodo.id, data.description);
			updateDescription(selectedTodo.id, data.description);
		}
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setIsEditing(e.target.value !== description);
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			reset();
			setIsEditing(false);
		}
	};

	return (
		<div onBlur={handleInputBlur} tabIndex={-1}>
			<form className="flex items-start flex-col w-full focus:outline-none mb-5" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between w-full">
					<p className="text-slate-600 pb-2">Description</p>
					{isEditing && (
						<Button type="submit" ariaLabel="Save New Todo Description">
							<Save size={18} />
						</Button>
					)}
				</div>
				<textarea
					{...register('description')}
					className="rounded-lg py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
					aria-label="Todo Description Input"
					placeholder={description || 'No description provided'}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
