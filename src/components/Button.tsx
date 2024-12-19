interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'submit';
	ariaLabel: string;
	disabled?: boolean;
}

export function Button({ children, onClick, type, ariaLabel, disabled }: ButtonProps) {
	return (
		<button
			className="hover:bg-slate-200 active:bg-slate-200 rounded-md p-1 text-slate-600 cursor-pointer relative"
			onClick={() => onClick && onClick()}
			type={type ? type : 'button'}
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
