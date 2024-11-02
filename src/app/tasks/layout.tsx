interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	return (
		<>
			<div className="flex relative min-h-screen bg-slate-100">
				<div className="sticky top-0 left-0">{left}</div>
				<div className="w-full">{main}</div>
				<div className="w-1/4 bg-white border-l-2">Hello World</div>
			</div>
		</>
	);
}
