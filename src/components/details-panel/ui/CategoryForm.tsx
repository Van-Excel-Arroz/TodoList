// CategoryForm.tsx
'use client';

import { Button } from '@/components/ui-shared/Button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface CategoryFormProps {
	onSubmit: (data: CategoryFormInputs) => void;
	handleIsAddingCategory: (val: boolean) => void;
}

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function CategoryForm({ onSubmit, handleIsAddingCategory }: CategoryFormProps) {
	const { register, handleSubmit, reset } = useForm<CategoryFormInputs>();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleFormSubmit = (data: CategoryFormInputs) => {
		if (data.category_title.length === 0) return;
		onSubmit(data);
		reset();
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleIsAddingCategory(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="flex items-center gap-2 justify-between w-full" onBlur={handleInputBlur} tabIndex={-1}>
				{isClient && (
					<input
						type="color"
						className="w-10 h-7 cursor-pointer rounded-full"
						defaultValue="#000000"
						{...register('hex_color')}
						aria-label="Color Picker"
					/>
				)}
				<input
					type="text"
					autoFocus
					className="border rounded-md w-full p-2 text-sm focus:outline-none border-slate-300 focus:border-slate-500 hover:border-slate-500"
					placeholder="Category Title"
					autoComplete="off"
					{...register('category_title', { maxLength: 20 })}
				/>
				<Button
					ariaLabel="Add Category"
					type="submit"
					darkMode={true}
					className="w-12 h-9 flex items-center justify-center"
				>
					<Plus size={20} />
				</Button>
			</div>
		</form>
	);
}
