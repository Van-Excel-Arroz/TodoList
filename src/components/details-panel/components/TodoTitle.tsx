'use client';

import { updateTodoTitleAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { div } from 'framer-motion/client';
import { Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
		if (title !== data.title) {
			await updateTodoTitleAction(selectedTodoId, data.title);
			updateTodoTitle(selectedTodoId, data.title);
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
					className="rounded-lg py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
					aria-label="Todo Title Input"
					placeholder={title}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
