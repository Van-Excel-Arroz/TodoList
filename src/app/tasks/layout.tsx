interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	return (
		<>
			<div className="flex relative">
				<div>{left}</div>
				<div className="w-full">{main}</div>
				<div className="w-1/4">Hello World</div>
			</div>
		</>
	);
}
