interface MenuItemProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	clickable?: boolean;
}

export default function MenuItem({ children, className, onClick, clickable = true }: MenuItemProps) {
	return (
		<div
			className={`${className || ''} ${
				clickable && 'hover:bg-slate-200 active:bg-slate-300 cursor-pointer'
			} flex items-center justify-center gap-2 p-2`}
			onClick={() => onClick && onClick()}
		>
			{children}
		</div>
	);
}
