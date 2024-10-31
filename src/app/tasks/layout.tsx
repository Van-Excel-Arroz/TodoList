import useSidebarStore from '@/components/Context/SidebarContext';

interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<>
			<div className="flex relative">
				<div className={isSidebarOpen ? 'block' : 'none'}>{left}</div>
				<div className="w-full">{main}</div>
				<div className="w-1/4">Hello World</div>
			</div>
		</>
	);
}
