import { PREDEFINED_THEME_COLORS } from '@/utils/constants';

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
			<div className=""></div>
		</>
	);
}
