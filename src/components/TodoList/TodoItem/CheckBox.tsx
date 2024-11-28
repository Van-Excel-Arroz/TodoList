import { Check } from 'lucide-react';
import { memo } from 'react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
}

function CheckBox({ isChecked, handleOnClick }: CheckBoxProps) {
	return (
		<div className="flex items-center">
			<button className="flex items-center" onClick={handleOnClick} aria-label={isChecked ? 'checked' : 'unchecked'}>
				{isChecked ? (
					<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-md hover:bg-slate-800 active:bg-slate-700">
						<Check color="white" size={15} />
					</div>
				) : (
					<div className="border border-black w-5 h-5 rounded-md hover:border-slate-600 active:border-slate-400"></div>
				)}
			</button>
		</div>
	);
}
export default memo(CheckBox);
