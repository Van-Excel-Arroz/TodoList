'use client';

import { useState } from 'react';

interface SelectionProps {
	options: string[];
}

export default function Selection({ options }: SelectionProps) {
	const [settingSection, setSettingSection] = useState(options[0].toLowerCase());

	return (
		<div className={`w-full grid grid-cols-${options.length}  text-center bg-slate-100 rounded-md p-2`}>
			{options.map(option => (
				<div
					className={`${
						settingSection === option.toLowerCase() ? 'text-black bg-white shadow-md rounded-lg' : 'text-slate-600'
					} col-span-1 py-1 cursor-pointer`}
					onClick={() => setSettingSection(option.toLowerCase())}
				>
					<p className="text-sm">{option}</p>
				</div>
			))}
		</div>
	);
}
