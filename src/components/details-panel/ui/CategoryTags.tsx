import { Category } from '@/types';
import { X } from 'lucide-react';

interface CategoryTagProps {
	category: Category;
	onRemove: (categoryId: number) => void;
}

export default function CategoryTags({ category, onRemove }: CategoryTagProps) {
	return (
		<span
			key={category.id}
			className="rounded-md flex items-center gap-1 px-2 py-1 text-sm"
			style={{
				color: category.hex_color,
				backgroundColor: `${category.hex_color}20`,
			}}
		>
			<p>{category.category_title}</p>
			<button
				className="rounded-md hover:outline hover:outline-1 active:bg-white"
				aria-label="Remove Category"
				onClick={() => onRemove(category.id)}
				style={{
					padding: 2,
				}}
			>
				<X size={12} />
			</button>
		</span>
	);
}
