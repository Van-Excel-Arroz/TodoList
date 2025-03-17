import { memo } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'submit';
	ariaLabel: string;
	disabled?: boolean;
	className?: string;
	darkMode?: boolean;
	isActive?: boolean;
}

function Button({
	children,
	onClick,
	type,
	ariaLabel,
	disabled,
	className = '',
	darkMode = false,
	isActive = false,
}: ButtonProps) {
	const bgStyle = `${
		isActive ? 'hover:bg-slate-200 text-slate-800 bg-slate-200' : 'bg-white hover:bg-slate-200 active:bg-slate-300'
	}`;

	const style = `${
		darkMode ? 'bg-slate-700 text-white hover:bg-slate-500 active:bg-slate-400' : ` text-slate-600 ${bgStyle}`
	}`;

	return (
		<button
			className={`${className} ${style} rounded-md p-1 relative cursor-pointer transition-all duration-400`}
			onClick={() => onClick && onClick()}
			type={type ? type : 'button'}
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default memo(Button);
