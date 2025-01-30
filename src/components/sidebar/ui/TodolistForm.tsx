'use client';

import { useForm } from 'react-hook-form';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';
import { Button } from '@/components/ui-shared/Button';
import { Plus } from 'lucide-react';

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

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-2 mb-4 flex flex-col">
				<div className="flex items-center gap-2">
					<input
						{...register('title', {
							required: true,
						})}
						type="text"
						placeholder="New list"
						className="py-1 px-2 w-full border-b border-slate-300 hover:border-slate-500 focus:border-slate-500 focus:outline-none"
					/>
					<Button
						type="submit"
						ariaLabel="Submit new list"
						darkMode={true}
						className="flex items-center justify-center"
					>
						<Plus size={20} />
					</Button>
				</div>
			</form>
		</>
	);
}
