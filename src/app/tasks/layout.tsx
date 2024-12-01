interface layoutProps {
	main: React.ReactNode;
	leftSidebar: React.ReactNode;
	rightSidebar: React.ReactNode;
}

export default function layout({ main, leftSidebar, rightSidebar }: layoutProps) {
	return (
		<>
			<div className="flex relative h-screen bg-slate-100">
				<div className="sticky top-0 left-0 h-screen">{leftSidebar}</div>
				<div className="w-full overflow-y-auto">{main}</div>
				<div>{rightSidebar}</div>
			</div>
		</>
	);
}
