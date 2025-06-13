import { Square, SquareCheck } from 'lucide-react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
	size?: number;
	accentColor: string;
}

export default function CheckBox({ isChecked, handleOnClick, size = 24, accentColor }: CheckBoxProps) {
	return (
		<button
			className="flex items-center text-slate-500 hover:opacity-80 active:opacity-60"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
			aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
		>
			{isChecked ? (
				<SquareCheck size={size} color={accentColor} />
			) : (
				<div className="flex items-center group">
					<Square className="group-hover:hidden" size={size} color={accentColor} />
					<SquareCheck className="hidden group-hover:block" size={size} color={accentColor} />
				</div>
			)}
		</button>
	);
}
