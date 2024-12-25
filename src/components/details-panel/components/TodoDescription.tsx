'use client';

import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoDescription() {
	const { selectedTodo, updateSelectedTodoDescription } = useSelectedTodoStore();
	const { updateDescription } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ description: string }>({
		defaultValues: { description: selectedTodo?.description ?? '' },
	});

	useEffect(() => {
		reset({ description: selectedTodo?.description ?? '' });
		setIsEditing(false);
	}, [selectedTodo, reset]);

	if (!selectedTodo) return null;

	const onSubmit = async (data: { description: string }) => {
		if (!data.description.trim()) {
			updateDescription(selectedTodo.id, null);
			updateSelectedTodoDescription(null);
		} else if (selectedTodo.description !== data.description) {
			updateDescription(selectedTodo.id, data.description);
			updateSelectedTodoDescription(data.description);
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
					autoFocus
					aria-label="Todo Description Input"
					placeholder="No description provided"
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
