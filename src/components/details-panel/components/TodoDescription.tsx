'use client';

import { updateTodoDescriptionAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function TodoDescription({ description }: { description: string }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { updateDescription } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ description: string }>({
		defaultValues: { description: description },
	});

	useEffect(() => {
		reset({ description: description });
		setIsEditing(false);
	}, [selectedTodoId, reset, description]);

	if (!selectedTodoId) return null;

	const onSubmit = async (data: { description: string }) => {
		if (!data.description.trim()) {
			const descriptionData = description !== data.description ? data.description : null;
			updateDescription(selectedTodoId, descriptionData);
			const result = await updateTodoDescriptionAction(selectedTodoId, descriptionData);
			if (!result.success) {
				toast.error(result.message);
				setIsEditing(false);
				return;
			}
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
					<p className="pb-2">Description</p>
					{isEditing && (
						<div className="flex items-center gap-2">
							<Button type="submit" ariaLabel="Save Todo Description" onMouseDown={e => e.preventDefault()}>
								<Save size={18} />
							</Button>
							<Button
								ariaLabel="Undo Description"
								type="button"
								onClick={() => reset()}
								onMouseDown={e => e.preventDefault()}
							>
								<Undo size={18} />
							</Button>
						</div>
					)}
				</div>
				<textarea
					{...register('description')}
					className="rounded-lg py-2 px-2 w-full border border-slate-300 focus:outline-none ring-offset-2 ring-slate-400 hover:ring-2 focus-within:ring-2"
					aria-label="Todo Description Input"
					placeholder={description || 'No description provided'}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
