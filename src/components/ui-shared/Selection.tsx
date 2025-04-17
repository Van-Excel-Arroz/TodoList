'use client';

interface SelectionProps {
	options: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

export default function Selection({ options, selectedOption, setSelectedOption }: SelectionProps) {
	return (
		<div className={`w-full flex text-center bg-slate-100 rounded-md p-2 border`}>
			{options.map((option, index) => (
				<div
					key={index}
					className={`${
						selectedOption === option ? 'text-black bg-white shadow-md rounded-lg' : 'text-slate-600'
					} flex-1 py-1 mx-1 cursor-pointer`}
					onClick={() => setSelectedOption(option)}
				>
					<p className="text-md">{option}</p>
				</div>
			))}
		</div>
	);
}
