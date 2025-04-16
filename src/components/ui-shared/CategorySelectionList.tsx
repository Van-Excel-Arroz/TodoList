import useCategoriesStore from '@/context/CategoriesContext';
import MenuItem from './MenuItem';
import { Check } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface CategorySelectionListProps {
	selectedCategoryTitles: string[];
	setSelectedCategoryTitles: Dispatch<SetStateAction<string[]>>;
	height?: string;
}

export default function CategorySelectionList({
	selectedCategoryTitles,
	setSelectedCategoryTitles,
	height = 'max-h-[30vh]',
}: CategorySelectionListProps) {
	const { categories } = useCategoriesStore();

	const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>, categoryTitle: string) => {
		event.stopPropagation();
		const isSelected = selectedCategoryTitles.find(title => title === categoryTitle);

		if (isSelected) {
			setSelectedCategoryTitles(titles => titles.filter(title => title !== categoryTitle));
		} else {
			setSelectedCategoryTitles(titles => [...titles, categoryTitle]);
		}
	};

	return (
		<div className={`${height} overflow-hidden overflow-y-auto`}>
			{categories.length > 0 ? (
				categories.map(category => (
					<MenuItem
						key={category.id}
						className="flex items-center justify-between"
						onClick={e => {
							if (e) handleCategoryClick(e, category.category_title);
						}}
					>
						<div className="flex items-center gap-2">
							<p style={{ color: category.hex_color }}>●</p>
							<p className="text-md">{category.category_title}</p>
						</div>
						{selectedCategoryTitles.includes(category.category_title) ? (
							<Check size={18} className="text-slate-600" />
						) : null}
					</MenuItem>
				))
			) : (
				<p className="py-6 px-3 text-slate-600">No available categories.</p>
			)}
		</div>
	);
}
