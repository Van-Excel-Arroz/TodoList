import { memo } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'submit' | 'button';
	ariaLabel: string;
	disabled?: boolean;
	className?: string;
	darkMode?: boolean;
	isActive?: boolean;
	focusStyle?: boolean;
	onMouseDown?: (e: React.MouseEvent) => void;
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
	focusStyle = true,
	onMouseDown,
}: ButtonProps) {
	const bgStyle = `${
		isActive ? 'hover:bg-slate-200 text-slate-800 bg-slate-200' : 'hover:bg-slate-200 active:bg-slate-300'
	}`;

	const disabledStyle = `${disabled && 'opacity-50'}`;

	const style = `${
		darkMode
			? `bg-slate-700 text-white ${!disabled && 'hover:bg-slate-500 active:bg-slate-400'}`
			: `text-slate-600 ${!disabled ? bgStyle : 'cursor-auto'}`
	}`;

	return (
		<button
			className={`${className} ${style} ${disabledStyle} rounded-lg p-1 cursor-pointer transition-all duration-400 ${
				focusStyle && 'focus-within:bg-slate-200'
			}`}
			onClick={() => onClick && onClick()}
			type={type ? type : 'button'}
			aria-label={ariaLabel}
			disabled={disabled}
			onMouseDown={onMouseDown}
		>
			{children}
		</button>
	);
}

export default memo(Button);
