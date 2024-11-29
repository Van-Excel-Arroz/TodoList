'use client';

import { createTodolist } from '../../actions/todolist-action';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';

export default function TodolistForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: any) {
		await createTodolist(data.title);
		reset();
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				<div className="flex flex-row justify-center ">
					<input
						{...register('title', {
							required: true,
							maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
						})}
						type="text"
						placeholder="New list"
						className="border rounded-lg rounded-r-none py-2 px-2 w-full drop-shadow-md focus:outline-none focus:border-gray-400 hover:border-gray-400"
					/>
					<button
						type="submit"
						className="border rounded-lg rounded-l-none shadow-md py-1 px-2 text-lg hover:bg-gray-100 active:bg-gray-200"
						aria-label="Add new list"
					>
						<Plus size={20} className="text-gray-400" />
					</button>
				</div>
				{errors.title?.message && typeof errors.title.message === 'string' && <p>{errors.title.message}</p>}
			</form>
		</>
	);
}
