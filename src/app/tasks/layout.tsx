interface LayoutProps {
	main: React.ReactNode;
	leftSidebar: React.ReactNode;
	rightSidebar: React.ReactNode;
}

export default function Layout({ main, leftSidebar, rightSidebar }: LayoutProps) {
	return (
		<>
			<div className=" border-b-2 drop-shadow-md bg-white h-14 px-6 flex items-center">Hello World</div>

			<div className="flex relative h-screen bg-slate-100">
				<div className="sticky top-0 left-0">{leftSidebar}</div>
				<div className="w-full overflow-y-auto">{main}</div>
				<div>{rightSidebar}</div>
			</div>
		</>
	);
}
