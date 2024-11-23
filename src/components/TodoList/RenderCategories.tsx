import { Category } from '@/types';

export default function RenderCategories({ categories }: { categories: Category[] }) {
	return (
		<div className="flex">
			{categories?.map(category => (
				<span
					key={category.id}
					className={`text-xs border shadow-md ml-2 rounded py-1 px-2`}
					style={{ color: category.hex_color }}
				>
					{category.category_title}
				</span>
			))}
		</div>
	);
}
