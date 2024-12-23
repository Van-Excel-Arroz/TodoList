'use client';

import { Button } from '@/components/ui-shared/Button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CategoryFormProps {
	onSubmit: (data: CategoryFormInputs) => void;
}

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function CategoryForm({ onSubmit }: CategoryFormProps) {
	const { register, handleSubmit, reset } = useForm<CategoryFormInputs>();

	const handleFormSubmit = (data: CategoryFormInputs) => {
		if (data.category_title.length === 0) return;
		onSubmit(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-center gap-2 justify-between w-full">
			<input type="color" className="w-10 h-7 cursor-pointer" defaultValue="#000000" {...register('hex_color')} />
			<input
				type="text"
				autoFocus
				className="border rounded-md w-full p-2 text-sm focus:outline-none border-slate-300 focus:border-slate-400 hover:border-slate-400"
				placeholder="Category Title"
				autoComplete="off"
				{...register('category_title', { maxLength: 20 })}
			/>
			<Button ariaLabel="Add Category" type="submit">
				<Plus size={20} />
			</Button>
		</form>
	);
}
