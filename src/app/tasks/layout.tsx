import SidebarContainer from '@/components/Sidebar/SidebarContainer';

interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	return (
		<>
			<div className="flex relative min-h-screen bg-slate-100">
				<SidebarContainer>{left}</SidebarContainer>
				<div className="w-full">{main}</div>
				<div className="w-1/4 bg-white border-l-2">Hello World</div>
			</div>
		</>
	);
}
