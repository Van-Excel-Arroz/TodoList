// CategoryForm.tsx
'use client';

import Button from '@/components/ui-shared/Button';
import { SendHorizontal, X } from 'lucide-react';
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
		<form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
			<div className="flex items-center gap-2 justify-between w-full" onBlur={handleInputBlur} tabIndex={-1}>
				{isClient && (
					<input
						type="color"
						className="w-10 h-6 cursor-pointer rounded-full"
						defaultValue="#000000"
						{...register('hex_color')}
						aria-label="Color Picker"
					/>
				)}
				<input
					type="text"
					autoFocus
					className="border-b w-full px-2 py-1 text-sm focus:outline-none border-slate-300 focus:border-slate-500 hover:border-slate-500"
					placeholder="Category Title"
					autoComplete="off"
					{...register('category_title', { maxLength: 20 })}
				/>
				<div className="flex items-center gap-1">
					<Button ariaLabel="Add Category" type="submit">
						<SendHorizontal size={20} />
					</Button>
					<Button ariaLabel="Cancel Adding Category" onClick={() => handleIsAddingCategory(false)}>
						<X size={20} />
					</Button>
				</div>
			</div>
		</form>
	);
}
