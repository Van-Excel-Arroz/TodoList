import { PREDEFINED_THEME_COLORS } from '@/utils/constants';
import { AppearanceSettings } from '@/utils/types';
import {
	Briefcase,
	DollarSign,
	GraduationCap,
	Grid2X2,
	Heart,
	Home,
	Lightbulb,
	List,
	ListTodo,
	Plane,
	ShoppingBasket,
	SquareKanban,
	Utensils,
} from 'lucide-react';

const boxStyle =
	'col-span-1 flex flex-col items-center border rounded-md py-4 cursor-pointer hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200';
const ICONS = [List, Home, Briefcase, GraduationCap, ShoppingBasket, Utensils, Heart, Plane, Lightbulb, DollarSign];
const LAYOUTS = [
	{
		icon: ListTodo,
		text: 'List',
	},
	{
		icon: Grid2X2,
		text: 'Grid',
	},
	{
		icon: SquareKanban,
		text: 'Kanban',
	},
];

interface AppearanceSetionProps {
	headerTextStyle: string;
	settings: AppearanceSettings;
	updateSetting: (key: keyof AppearanceSettings, value: any) => void;
}

export default function AppearanceSection({ headerTextStyle }: AppearanceSetionProps) {
	return (
		<>
			<p className={headerTextStyle}>Accent Color</p>
			<div className="flex items-center gap-2 mb-4">
				{PREDEFINED_THEME_COLORS.map(color => (
					<div
						key={color}
						className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 active:scale-100 transition-scale duration-150 ease-out"
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
			<p className={headerTextStyle}>List Icon</p>
			<div className="grid grid-cols-5 gap-4 mb-4">
				{ICONS.map((ListIcon, index) => (
					<div key={index} className={boxStyle}>
						<ListIcon />
					</div>
				))}
			</div>
			<p className={headerTextStyle}>Layout</p>
			<div className="grid grid-cols-3 gap-2 mb-4">
				{LAYOUTS.map(Layout => (
					<div key={Layout.text} className={boxStyle}>
						<Layout.icon />
						<p className="text-md">{Layout.text}</p>
					</div>
				))}
			</div>
		</>
	);
}
