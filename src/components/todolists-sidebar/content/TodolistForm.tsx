'use client';

import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { createTodolist } from '@/actions/todolist-action';
import useTodoListsStore from '@/context/TodoListsContext';

export default function TodolistForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const { addTodolist } = useTodoListsStore();

	async function onSubmit(data: any) {
		if (!data.title?.trim()) return;
		const todolistId = await createTodolist(data.title);

		if (!todolistId) return;

		addTodolist({ id: todolistId, title: data.title });
		reset();
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				{errors.title?.message && <p>{errors.title.message as string}</p>}
				<div className="flex flex-row justify-center ">
					<TitleInput register={register} />
					<AddButton />
				</div>
			</form>
		</>
	);
}

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

const AddButton = () => (
	<button
		type="submit"
		className="rounded-lg rounded-l-none py-1 px-2 text-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 active:bg-slate-200"
		aria-label="Add new list"
	>
		<Plus size={20} className="text-gray-600" />
	</button>
);

const TitleInput = ({ register }: { register: any }) => (
	<input
		{...register('title', {
			required: true,
			maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
		})}
		type="text"
		placeholder="New list"
		className=" rounded-lg rounded-r-none py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
	/>
);
