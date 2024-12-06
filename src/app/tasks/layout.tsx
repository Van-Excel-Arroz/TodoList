import LeftSidebarPage from '@/components/leftSidebar/LeftSidebarPage';
import Navbar from '@/components/Navbar';
import RightSidebarPage from '@/components/rightSidebar/RightSidebarPage';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<div className="flex flex-col bg-slates-100">
				<Navbar />
				<div className="flex relative h-screen">
					<div className="absolute lg:relative top-0 left-0 z-30">
						<LeftSidebarPage />
					</div>
					<div className="w-full overflow-y-auto z-10">{children}</div>
					<div className="absolute lg:relative top-0 right-0 z-40">
						<RightSidebarPage />
					</div>
				</div>
			</div>
		</>
	);
}
