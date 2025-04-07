import Link from 'next/link';

interface MenuItemProps {
	children: React.ReactNode;
	className?: string;
	onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	clickable?: boolean;
	href?: string;
	textSize?: string;
}

export default function MenuItem({
	children,
	className,
	onClick,
	clickable = true,
	href,
	textSize = 'text-base',
}: MenuItemProps) {
	return (
		<>
			{href ? (
				<Link
					href={href}
					className={`${textSize} flex items-center justify-center gap-2 hover:bg-slate-200 active:bg-slate-300 cursor-pointer p-2`}
				>
					{children}
				</Link>
			) : (
				<div
					className={`${className || ''} ${textSize} ${
						clickable && 'hover:bg-slate-200 active:bg-slate-300 cursor-pointer'
					} flex items-center gap-2 p-2 relative`}
					onClick={event => onClick && onClick(event)}
				>
					{children}
				</div>
			)}
		</>
	);
}
