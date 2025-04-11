import { Circle } from 'lucide-react';

export default function RadioButtonGroup({ options }: { options: string[] }) {
	return (
		<div>
			{options.map((label, index) => (
				<div key={index} className="flex items-center gap-2 py-1">
					<Circle size={20} />
					<p>label</p>
				</div>
			))}
		</div>
	);
}

// <div className="relative inline-block w-5">
// 			<Circle size={20} className="text-gray-500" />
// 			<Circle
// 				fill="black"
// 				size={10}
// 				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
// 				strokeWidth={0}
// 			/>
// 		</div>
