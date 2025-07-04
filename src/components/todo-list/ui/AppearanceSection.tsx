import Typography from '@/components/ui-shared/Typography';
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
const ICONS = [
	List,
	Home,
	Briefcase,
	GraduationCap,
	ShoppingBasket,
	Utensils,
	Heart,
	Plane,
	Lightbulb,
	DollarSign,
] as const;
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
] as const;

const focusStyle = 'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2';

interface AppearanceSectionProps {
	settings: AppearanceSettings;
	updateSetting: (key: keyof AppearanceSettings, value: any) => void;
}

export default function AppearanceSection({ settings, updateSetting }: AppearanceSectionProps) {
	return (
		<div className="h-[90%] px-4 overflow-y-scroll">
			<Typography>Accent Color</Typography>
			<div className="flex items-center gap-4 mb-4 flex-wrap">
				{PREDEFINED_THEME_COLORS.map(color => {
					const isActive = settings.accent === color;
					return (
						<button
							key={color}
							className={`${focusStyle} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-scale duration-75 ease-out`}
							style={{ backgroundColor: color }}
							onClick={() => updateSetting('accent', color)}
							type="button"
							aria-label={`Select ${color} Accent`}
						>
							{isActive && <Check color="white" strokeWidth={4} />}
						</button>
					);
				})}
			</div>
			<Typography>List Icon</Typography>
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
				{ICONS.map((ListIcon, index) => {
					const iconName = ListIcon.displayName;
					const isActive = settings.listIcon === iconName;
					return (
						<button
							key={index}
							type="button"
							aria-label={`Select ${iconName} Icon`}
							className={`${boxStyle} ${focusStyle} ${isActive && activeBoxStyle}`}
							onClick={() => updateSetting('listIcon', iconName)}
						>
							<ListIcon />
						</button>
					);
				})}
			</div>
			<Typography>Layout</Typography>
			<div className="grid grid-cols-3 gap-2 mb-4">
				{LAYOUTS.map(Layout => {
					const isActive = settings.layout === Layout.text;
					return (
						<button
							key={Layout.text}
							type="button"
							aria-label={`Select ${Layout.text} Layout`}
							className={`${boxStyle} ${focusStyle} ${isActive && activeBoxStyle}`}
							onClick={() => updateSetting('layout', Layout.text)}
						>
							<Layout.icon />
							<p className="text-md">{Layout.text}</p>
						</button>
					);
				})}
			</div>
		</div>
	);
}
