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
				<div className="absolute lg:relative top-0 left-0 z-30">{leftSidebar}</div>
				<div className="w-full overflow-y-auto">{main}</div>
				<div className="absolute lg:relative top-0 right-0 z-40">{rightSidebar}</div>
			</div>
		</>
	);
}
