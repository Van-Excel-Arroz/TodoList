import Button from '@/components/ui-shared/Button';
import ColorSelectionMenu from '@/components/ui-shared/ColorSelectionMenu';
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
								<ColorSelectionMenu initialColor="#000000">
									<Palette size={20} />
								</ColorSelectionMenu>
								<Button ariaLabel="Delete Category">
									<Trash2 size={20} className="text-red-600" />
								</Button>
							</div>
						</div>
					))
				) : (
					<p className="py-6 px-3 text-slate-600 text-center">No available categories.</p>
				)}
			</div>
			<p className={headerTextStyle}>Add New Category</p>
			<div className="flex items-center gap-2">
				<ColorSelectionMenu initialColor="#000000">
					<div
						aria-label="Select Color for Category"
						className="w-14 h-10 bg-black rounded-lg cursor-pointer relative"
					/>
				</ColorSelectionMenu>

				<input
					type="text"
					className="py-2 px-4 border rounded-md border-slate-300 hover:border-slate-600 focus:outline-none w-full"
					placeholder="Category Name"
				/>
				<Button type="submit" ariaLabel="Add New Category" className="p-2 text-md font-bold text-nowrap">
					+ Add Task
				</Button>
			</div>
		</>
	);
}
