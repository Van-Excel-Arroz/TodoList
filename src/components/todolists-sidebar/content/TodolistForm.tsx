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
		await createTodolist(data.title);

		addT;
		reset();
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				<div className="flex flex-row justify-center ">
					<TitleInput register={register} />
					<AddButton />
				</div>
				{errors.title?.message && typeof errors.title.message === 'string' && <p>{errors.title.message}</p>}
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
		className="rounded-lg rounded-l-none py-1 px-2 text-lg outline outline-1 outline-slate-300 hover:outline-slate-400 active:bg-gray-200 shadow-md"
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
		className=" rounded-lg rounded-r-none py-2 px-2 w-full outline outline-1 outline-slate-300 hover:outline-slate-400 focus:outline-slate-400 shadow-md"
	/>
);
