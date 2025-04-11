import { Circle } from 'lucide-react';
import { useState } from 'react';

export default function RadioButtonGroup({ options }: { options: string[] }) {
	const [selectedOption, setSelectedOption] = useState<number>(0);

	return (
		<div className="mb-2">
			{options.map((label, index) => (
				<div key={index} className="flex items-center gap-2 py-1">
					<div
						className="relative inline-block w-5 cursor-pointer hover:text-slate-800 active:text-slate-600"
						onClick={() => setSelectedOption(index)}
					>
						{index === selectedOption ? <DotInCircle /> : <Circle size={20} />}
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
