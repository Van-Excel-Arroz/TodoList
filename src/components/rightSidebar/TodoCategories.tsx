'use client';

import { Plus, SendHorizontal, X } from 'lucide-react';
import { Category } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useTodoStore from '@/context/todoContext';

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

interface TodoCategoriesProps {
	categories: Category[];
	todoId: number;
}

export default function TodoCategories({ categories, todoId }: TodoCategoriesProps) {
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const { register, handleSubmit, reset } = useForm<CategoryFormInputs>();
	const { selectedTodo } = useTodoStore();

	const isSelectedTodo = selectedTodo?.id === todoId;

	if (isSelectedTodo) reset();

	const handleAddCategory = (val: boolean) => {
		setIsAddingCategory(val);
		reset();
	};

	const onSubmit = async (data: CategoryFormInputs) => {
		console.log(data);
		reset();
		handleAddCategory(false);
	};
	return (
		<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border">
			<div className="flex justify-between items-center w-full text-slate-600">
				<p className="text-sm">Categories</p>
				{isAddingCategory ? (
					<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 justify-end">
						<input type="color" className="w-5 h-5 cursor-pointer" defaultValue="#000000" {...register('hex_color')} />
						<input
							type="text"
							className="border rounded-md w-1/2 p-1 text-sm focus:outline-none focus:border-slate-400 hover:border-slate-400"
							placeholder="Category Title"
							autoComplete="off"
							{...register('category_title', { maxLength: 20 })}
						/>
						<button className="hover:bg-slate-200 rounded-md p-1" aria-label="Add Category" type="submit">
							<SendHorizontal size={20} />
						</button>
						<button
							onClick={() => handleAddCategory(false)}
							className="hover:bg-slate-200 rounded-md p-1"
							aria-label="Cancel Adding Category"
						>
							<X size={20} />
						</button>
					</form>
				) : (
					<button
						className="block hover:bg-slate-200 rounded-md p-1"
						aria-label="Add Category"
						onClick={() => handleAddCategory(true)}
					>
						<Plus size={20} />
					</button>
				)}
			</div>
			<div className={`flex flex-wrap items-cente gap-2 ${categories.length === 0 ? 'py-0' : 'py-2'}`}>
				{categories.map(category => (
					<span
						key={category.id}
						className={`bg-white border rounded py-1 px-2 shadow-md hover:bg-slate-10`}
						style={{ color: category.hex_color }}
					>
						{category.category_title}
					</span>
				))}
			</div>
		</div>
	);
}
