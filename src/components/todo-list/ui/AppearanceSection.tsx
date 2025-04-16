import Button from '@/components/ui-shared/Button';
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
	'col-span-1 flex flex-col items-center border rounded-md py-4 cursor-pointer hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200';
const activeBoxStyle = 'border-slate-400 bg-slate-100';
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
							} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 active:scale-105 transition-scale duration-150 ease-out`}
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
						<Button
							key={index}
							ariaLabel={`Select ${iconName} Icon`}
							className={`${boxStyle} ${isActive && activeBoxStyle}`}
							onClick={() => updateSetting('listIcon', iconName)}
						>
							<ListIcon />
						</Button>
					);
				})}
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
