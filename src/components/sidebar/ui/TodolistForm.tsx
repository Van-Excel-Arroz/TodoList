'use client';

import { useForm } from 'react-hook-form';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';
import Button from '@/components/ui-shared/Button';
import { SendHorizontal, X } from 'lucide-react';

export default function TodolistForm({ handleIsAddingList }: { handleIsAddingList: (val: boolean) => void }) {
	const { register, handleSubmit, reset } = useForm();

	const { addTodolist } = useTodoListsStore();

	async function onSubmit(data: any) {
		if (!data.title?.trim()) return;
		const todolistId = await createTodolist(data.title);

		if (!todolistId) return;

		addTodolist({ id: todolistId, title: data.title });
		reset();
		handleIsAddingList(false);
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
						className="px-2 py-1 mr-2 w-full border-b border-slate-300 hover:border-slate-500 focus:border-slate-500 focus:outline-none"
					/>
					<Button type="submit" ariaLabel="Submit new list">
						<SendHorizontal size={20} />
					</Button>
					<Button ariaLabel="Cancel adding new list" onClick={() => handleIsAddingList(false)}>
						<X size={20} />
					</Button>
				</div>
			</form>
		</>
	);
}
