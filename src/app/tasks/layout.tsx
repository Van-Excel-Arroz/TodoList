import Sidebar from '@/components/Sidebar/Sidebar';
import SidebarProvider from '@/components/Context/SidebarContext';
import { memo } from 'react';

interface layoutProps {
	main: React.ReactNode;
}

const MemoizedSidebar = memo(Sidebar);

export default function layout({ main }: layoutProps) {
	return (
		<>
			<SidebarProvider>
				<div className="flex relative">
					<MemoizedSidebar />
					{main}
				</div>
			</SidebarProvider>
		</>
	);
}
