import Button from '@/components/ui-shared/Button';
import useCategoriesStore from '@/context/CategoriesContext';
import { Palette, Trash2 } from 'lucide-react';

export default function CategoriesSection({ headerTextStyle }: { headerTextStyle: string }) {
	const { categories } = useCategoriesStore();

	return (
		<>
			<p className={headerTextStyle}>Category Management</p>
			<div className="h-[40vh] overflow-hidden overflow-y-auto">
				{categories.length > 0 ? (
					categories.map(category => (
						<div key={category.id} className="flex items-center justify-between px-2 py-1">
							<div className="flex items-center gap-2">
								<p className="text-2xl" style={{ color: category.hex_color }}>
									●
								</p>
								<p>{category.category_title}</p>
							</div>
							<div className="flex items-center gap-2">
								<Button ariaLabel="Change Category Color">
									<Palette size={20} />
								</Button>
								<Button ariaLabel="Delete Category">
									<Trash2 size={20} className="text-red-600" />
								</Button>
							</div>
						</div>
					))
				) : (
					<p className="py-6 px-3 text-slate-600">No available categories.</p>
				)}
			</div>
			<p className={headerTextStyle}>Add New Category</p>
		</>
	);
}
