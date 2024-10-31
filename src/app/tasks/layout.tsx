interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	return (
		<>
			<div className="flex relative bg-slate-100">
				<div>{left}</div>
				<div className="w-full">{main}</div>
				<div className="w-1/4 bg-white bor">Hello World</div>
			</div>
		</>
	);
}
