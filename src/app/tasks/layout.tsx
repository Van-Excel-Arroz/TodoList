import { SidebarProvider } from '@/components/Context/SidebarContext';

interface layoutProps {
	main: React.ReactNode;
	left: React.ReactNode;
}

export default function layout({ main, left }: layoutProps) {
	return (
		<>
			<SidebarProvider>
				<div className="flex relative">
					<div className="w-1/4">{left}</div>
					<div className="flex-1">{main}</div>
				</div>
			</SidebarProvider>
		</>
	);
}
