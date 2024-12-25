import { Check, Square, SquareCheckBig } from 'lucide-react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
}

export default function CheckBox({ isChecked, handleOnClick }: CheckBoxProps) {
	return (
		<div className="flex items-center">
			<button
				className="flex items-center"
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					handleOnClick();
				}}
				aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
			>
				{isChecked ? (
					<SquareCheckBig className="text-slate-800 active:text-slate-600" />
				) : (
					<div className="w-5 h-5 group text-slate-800 active:text-slate-600">
						<Square className="group-hover:hidden" />
						<SquareCheckBig className="hidden group-hover:block" />
					</div>
				)}
			</button>
		</div>
	);
}
