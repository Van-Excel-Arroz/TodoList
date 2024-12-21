import { Category } from '@/types';
import { X } from 'lucide-react';

interface CategoryTagProps {
	category: Category;
	onRemove: (categoryId: number) => void;
}

export default function CategoryTag({ category, onRemove }: CategoryTagProps) {
	return (
		<span
			key={category.id}
			className="rounded-md flex items-center gap-2 px-2 py-1"
			style={{
				color: category.hex_color,
				backgroundColor: `${category.hex_color}20`,
			}}
		>
			<p>{category.category_title}</p>
			<button
				className="rounded-md p-1 hover:bg-white hover:outline hover:outline-1 active:bg-white "
				aria-label="Remove Category"
				onClick={() => onRemove(category.id)}
			>
				<X size={16} />
			</button>
		</span>
	);
}
