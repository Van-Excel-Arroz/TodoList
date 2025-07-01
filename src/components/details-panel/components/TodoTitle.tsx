'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function TodoTitle({ title }: { title: string }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { updateTodoTitle } = useTodosStore();
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ title: string }>({
		defaultValues: { title: title },
	});

	useEffect(() => {
		reset({ title: title });
		setIsEditing(false);
	}, [selectedTodoId, reset, title]);

	if (!selectedTodoId) return null;

	const onSubmit = async (data: { title: string }) => {
		if (!data.title.trim()) return;
		const toastId = toast.loading('Updating todo title...');
		const result = await updateTodoTitleAction(selectedTodoId, data.title);
		if (result.success && title !== data.title) {
			updateTodoTitle(selectedTodoId, data.title);
			toast.success(result.message, { id: toastId });
		} else {
			toast.error(result.message, { id: toastId });
		}
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setIsEditing(e.target.value !== title);
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
					<p className="pb-2">Title</p>
					{isEditing && (
						<div className="flex items-center gap-2">
							<Button type="submit" ariaLabel="Save New Todo Title">
								<Save size={18} />
							</Button>
							<Button ariaLabel="Undo Due Date" type="submit" onClick={() => reset()}>
								<Undo size={18} />
							</Button>
						</div>
					)}
				</div>
				<textarea
					{...register('title')}
					className="rounded-lg py-2 px-2 w-full border border-slate-300 focus:outline-none ring-offset-2 ring-slate-400 hover:ring-2 focus-within:ring-2"
					aria-label="Todo Title Input"
					placeholder={title}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
