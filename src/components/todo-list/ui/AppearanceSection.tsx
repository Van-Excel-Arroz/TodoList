import { PREDEFINED_THEME_COLORS } from '@/utils/constants';
import { AppearanceSettings } from '@/utils/types';
import {
	Briefcase,
	Check,
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
	'col-span-1 flex flex-col items-center border rounded-md py-4 cursor-pointer hover:bg-slate-200 hover:border-slate-400 active:bg-slate-300';
const activeBoxStyle = 'border-slate-500 bg-slate-200 ';
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

export default function AppearanceSection({ headerTextStyle, settings, updateSetting }: AppearanceSetionProps) {
	return (
		<>
			<p className={headerTextStyle}>Accent Color</p>
			<div className="flex items-center gap-4 mb-4">
				{PREDEFINED_THEME_COLORS.map(color => {
					const isActive = settings.accent === color;
					return (
						<div
							key={color}
							className={`${
								isActive && 'ring-2 ring-offset-2'
							} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-scale duration-75 ease-out`}
							style={{ backgroundColor: color }}
							onClick={() => updateSetting('accent', color)}
						>
							{isActive && <Check color="white" strokeWidth={4} />}
						</div>
					);
				})}
			</div>
			<p className={headerTextStyle}>List Icon</p>
			<div className="grid grid-cols-5 gap-4 mb-4">
				{ICONS.map((ListIcon, index) => {
					const iconName = ListIcon.displayName;
					const isActive = settings.listIcon === iconName;
					return (
						<button
							key={index}
							aria-label={`Select ${iconName} Icon`}
							className={`${boxStyle} ${isActive && activeBoxStyle}`}
							onClick={() => updateSetting('listIcon', iconName)}
						>
							<ListIcon />
						</button>
					);
				})}
			</div>
			<p className={headerTextStyle}>Layout</p>
			<div className="grid grid-cols-3 gap-2 mb-4">
				{LAYOUTS.map(Layout => {
					const isActive = settings.layout === Layout.text;
					return (
						<button
							key={Layout.text}
							aria-label={`Select ${Layout.text} Layout`}
							className={`${boxStyle} ${isActive && activeBoxStyle}`}
							onClick={() => updateSetting('layout', Layout.text)}
						>
							<Layout.icon />
							<p className="text-md">{Layout.text}</p>
						</button>
					);
				})}
			</div>
		</>
	);
}
