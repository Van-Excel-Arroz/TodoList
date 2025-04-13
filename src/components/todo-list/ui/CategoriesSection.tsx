import useCategoriesStore from '@/context/CategoriesContext';

export default function CategoriesSection({ headerTextStyle }: { headerTextStyle: string }) {
	const { categories } = useCategoriesStore();

	return (
		<>
			<p className={headerTextStyle}>Category Management</p>
			<div className="h-[40vh] overflow-hidden overflow-y-auto">
				{categories.length > 0 ? (
					categories.map(category => (
						<div key={category.id} className="flex items-center gap-2 py-1">
							<p className="text-2xl" style={{ color: category.hex_color }}>
								●
							</p>
							<p>{category.category_title}</p>
						</div>
					))
				) : (
					<p className="py-6 px-3 text-slate-600">No available categories.</p>
				)}
			</div>
		</>
	);
}
