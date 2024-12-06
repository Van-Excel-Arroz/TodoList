import LeftSidebarPage from '@/components/leftSidebar/LeftSidebarPage';
import Navbar from '@/components/Navbar';
import RightSidebarPage from '@/components/rightSidebar/RightSidebarPage';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<body className="flex flex-col bg-slates-100 overflow-hidden">
				<div className="sticky top-0 left-0 z-20 w-full">
					<Navbar />
				</div>
				<div className="flex h-screen">
					<div className="absolute lg:sticky top-0 left-0 z-30">
						<LeftSidebarPage />
					</div>
					<main className="w-full overflow-y-auto z-10">{children}</main>
					<div className="absolute lg:sticky top-0 right-0 z-40">
						<RightSidebarPage />
					</div>
				</div>
			</body>
		</>
	);
}
