import { SidebarProvider } from '@/components/Context/SidebarContext';
import Sidebar from '@/components/Sidebar/Sidebar';

interface layoutProps {
	main: React.ReactNode;
}

export default function layout({ main }: layoutProps) {
	return (
		<>
			<SidebarProvider>
				<div className="flex relative">
					<Sidebar />
					{main}
				</div>
			</SidebarProvider>
		</>
	);
}
