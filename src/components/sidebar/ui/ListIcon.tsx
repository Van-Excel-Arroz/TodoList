import {
	Briefcase,
	Check,
	DollarSign,
	GraduationCap,
	Heart,
	Home,
	Lightbulb,
	List,
	ListTodo,
	Plane,
	ShoppingBasket,
	Utensils,
	Clock3,
	Star,
	Tags,
} from 'lucide-react';

const IconMap = {
	Briefcase: Briefcase,
	Check: Check,
	DollarSign: DollarSign,
	GraduationCap: GraduationCap,
	Heart: Heart,
	House: Home,
	Lightbulb: Lightbulb,
	List: List,
	ListTodo: ListTodo,
	Plane: Plane,
	ShoppingBasket: ShoppingBasket,
	Utensils: Utensils,
	Clock3: Clock3,
	Star: Star,
	Tags: Tags,
};

export type iconNameType = keyof typeof IconMap;

export default function ListIcon({ iconName }: { iconName: iconNameType }) {
	const Icon = IconMap[iconName];

	return <Icon size={20} className="text-slate-600" />;
}
