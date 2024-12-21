import { Check } from 'lucide-react';

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
					<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-md hover:bg-slate-800 active:bg-slate-700">
						<Check color="white" size={15} />
					</div>
				) : (
					<div className="border border-black w-5 h-5 rounded-md active:border-slate-700 ">
						<div className="flex justify-center items-center h-full opacity-0 hover:opacity-80">
							<Check color="black" size={15} />
						</div>
					</div>
				)}
			</button>
		</div>
	);
}
