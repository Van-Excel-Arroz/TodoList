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
					<div>{left}</div>
					<div className="w-full">{main}</div>
				</div>
			</SidebarProvider>
		</>
	);
}
