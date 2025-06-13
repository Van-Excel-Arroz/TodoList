'use client';

interface SelectionProps {
	options: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

export default function Selection({ options, selectedOption, setSelectedOption }: SelectionProps) {
	return (
		<div className={`w-full flex text-center bg-slate-100 rounded-md p-2 border border-slate-300`}>
			{options.map((option, index) => (
				<div
					key={index}
					className={`${
						selectedOption === option
							? 'text-black bg-white shadow-md'
							: 'text-slate-600 hover:bg-slate-200 active:bg-slate-300'
					} flex-1 py-1 mx-1 cursor-pointer rounded-lg`}
					onClick={() => setSelectedOption(option)}
				>
					<p className="text-md">{option}</p>
				</div>
			))}
		</div>
	);
}
