'use client';

interface SelectionProps {
	options: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

export default function Selection({ options, selectedOption, setSelectedOption }: SelectionProps) {
	return (
		<div className={`w-full flex text-center bg-slate-100 rounded-md p-2`}>
			{options.map((option, index) => (
				<div
					key={index}
					className={`${
						selectedOption === option.toLowerCase() ? 'text-black bg-white shadow-md rounded-lg' : 'text-slate-600'
					} flex-1 py-1 mx-1 cursor-pointer`}
					onClick={() => setSelectedOption(option.toLowerCase())}
				>
					<p className="text-sm">{option}</p>
				</div>
			))}
		</div>
	);
}
