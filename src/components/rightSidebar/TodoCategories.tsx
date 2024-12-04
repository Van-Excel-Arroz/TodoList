'use client';

import { Plus, Send, SendHorizontal, X } from 'lucide-react';
import { Category } from '@/types';
import { useState } from 'react';

export default function TodoCategories({ categories }: { categories: Category[] }) {
	const [isAddingCategory, setIsAddingCategory] = useState(false);

	const handleAddCategory = (val: boolean) => {
		setIsAddingCategory(val);
	};
	return (
		<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border">
			<div className="flex justify-between items-center w-full text-slate-600">
				<p className="text-sm">Categories</p>
				{isAddingCategory ? (
					<div className="flex items-center gap-2 justify-end">
						<input type="color" className="w-5 h-5" defaultValue="#000000" />
						<input
							type="text"
							className="border rounded-md w-1/2 p-1 focus:outline-none focus:border-slate-400 hover:border-slate-400"
						/>
						<SendHorizontal size={20} />
						<button onClick={() => handleAddCategory(false)}>
							<X size={20} />
						</button>
					</div>
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
