'use client';

import { useForm } from 'react-hook-form';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';
import Button from '@/components/ui-shared/Button';
import { SendHorizontal, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TodolistForm({ handleIsAddingList }: { handleIsAddingList: (val: boolean) => void }) {
	const { register, handleSubmit, reset } = useForm();
	const { addTodolist } = useTodoListsStore();

	async function onSubmit(data: any) {
		if (!data.title?.trim()) return;
		const toastId = toast.loading('Creating new list...');
		const result = await createTodolist(data.title);

		if (result.success && result.data) {
			addTodolist({ id: result.data, title: data.title, settings: null });
			toast.success('List created successfully', { id: toastId });
		} else {
			toast.error('Failed to create list', { id: toastId });
		}
		handleIsAddingList(false);
		reset();
	}

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleIsAddingList(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="w-[80%]">
				<div className="flex items-center gap-1" onBlur={handleInputBlur} tabIndex={-1}>
					<input
						{...register('title', {
							required: true,
						})}
						type="text"
						placeholder="New list"
						autoFocus
						className="px-2 py-2 mr-2 w-full border-b border-slate-300 hover:border-slate-500 focus:border-slate-500 focus:outline-none"
					/>
					<Button type="submit" ariaLabel="Submit new list">
						<SendHorizontal size={20} />
					</Button>
					<Button ariaLabel="Cancel Adding New List" onClick={() => handleIsAddingList(false)}>
						<X size={20} />
					</Button>
				</div>
			</form>
		</>
	);
}
