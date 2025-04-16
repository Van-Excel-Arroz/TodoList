import { SingleSelectionProps } from '@/utils/types';
import { Circle } from 'lucide-react';

interface RadioButtonGroupProps extends SingleSelectionProps {
	options: string[];
}

export default function RadioButtonGroup({ options, selectedOption, onOptionSelect }: RadioButtonGroupProps) {
	return (
		<div className="mb-4">
			{options.map(label => (
				<div
					key={label}
					aria-label={`Select ${label} Option`}
					className="flex items-center gap-2 py-1 cursor-pointer hover:text-slate-800 active:text-slate-600"
					onClick={() => onOptionSelect(label)}
				>
					<div className="relative inline-block w-5 ">
						{label === selectedOption ? <DotInCircle /> : <Circle size={20} />}
					</div>
					<p>{label}</p>
				</div>
			))}
		</div>
	);
}

function DotInCircle() {
	return (
		<>
			<Circle size={20} className="text-gray-500" />
			<Circle
				fill="black"
				size={10}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				strokeWidth={0}
			/>
		</>
	);
}
