import { Plus } from 'lucide-react';
import { Category } from '@/types';

export default function TodoCategories({ categories }: { categories: Category[] }) {
	return (
		<div className="flex flex-col items-start bg-slate-100 rounded-md px-4 py-2 border">
			<div className="flex justify-between items-center w-full text-slate-600">
				<p className="text-sm">Categories</p>
				<button className="block hover:bg-slate-200 rounded-md p-1" aria-label="Add Category">
					<Plus size={20} />
				</button>
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
