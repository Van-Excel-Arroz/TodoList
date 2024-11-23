import { Check } from 'lucide-react';
import { memo } from 'react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
}

function CheckBox({ isChecked, handleOnClick }: CheckBoxProps) {
	return (
		<div className="col-end-1 flex items-center">
			<label className="flex items-center cursor-pointer" onClick={handleOnClick}>
				{isChecked ? (
					<div className="bg-black p-1 w-5 h-5 flex justify-center items-center rounded-md">
						<Check color="white" size={15} />
					</div>
				) : (
					<div className="border border-black w-5 h-5 rounded-md hover:border-slate-600 active:border-slate-400"></div>
				)}
			</label>
		</div>
	);
}
export default memo(CheckBox);
