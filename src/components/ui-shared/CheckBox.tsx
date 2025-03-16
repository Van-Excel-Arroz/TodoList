import { Square, SquareCheckBig } from 'lucide-react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
	size?: number;
}

export default function CheckBox({ isChecked, handleOnClick, size = 24 }: CheckBoxProps) {
	return (
		<button
			className="flex items-center text-slate-500 active:text-slate-400 hover:text-slate-600"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
			aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
		>
			{isChecked ? (
				<SquareCheckBig size={size} />
			) : (
				<div className="flex items-center group">
					<Square className="group-hover:hidden" size={size} />
					<SquareCheckBig className="hidden group-hover:block" size={size} />
				</div>
			)}
		</button>
	);
}
