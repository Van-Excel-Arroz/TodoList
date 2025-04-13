import { PREDEFINED_THEME_COLORS } from '@/utils/constants';
import {
	Briefcase,
	DollarSign,
	GraduationCap,
	Heart,
	Home,
	Lightbulb,
	List,
	Plane,
	ShoppingBasket,
	Utensils,
} from 'lucide-react';

const ICONS = [List, Home, Briefcase, GraduationCap, ShoppingBasket, Utensils, Heart, Plane, Lightbulb, DollarSign];

export default function AppearanceSection({ headerTextStyle }: { headerTextStyle: string }) {
	return (
		<>
			<p className={headerTextStyle}>List Theme / Accent Color</p>
			<div className="flex items-center gap-2 py-2">
				{PREDEFINED_THEME_COLORS.map(color => (
					<div
						key={color}
						className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 active:scale-100 transition-scale duration-150 ease-out"
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
			<p className={headerTextStyle}>List Icon</p>
			<div className="grid grid-cols-5 gap-4">
				{ICONS.map(ListIcon => (
					<div className="col-span-1 flex justify-center border rounded-md py-4 cursor-pointer hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200">
						<ListIcon />
					</div>
				))}
			</div>
		</>
	);
}
