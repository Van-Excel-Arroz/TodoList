import Navbar from '@/components/Navbar';

interface LayoutProps {
	main: React.ReactNode;
	leftSidebar: React.ReactNode;
	rightSidebar: React.ReactNode;
}

export default function Layout({ main, leftSidebar, rightSidebar }: LayoutProps) {
	return (
		<>
			<Navbar />
			<div className="flex relative h-screen bg-slate-100">
				<div className="sticky top-0 left-0">{leftSidebar}</div>
				<div className="w-full overflow-y-auto">{main}</div>
				<div>{rightSidebar}</div>
			</div>
		</>
	);
}
