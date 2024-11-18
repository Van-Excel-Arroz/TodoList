import SidebarContent from './SidebarContent';
import { TodoList } from '@/types';
import SidebarWrapper from './SidebarWrapper';

interface SidebarListProps {
	todolists: TodoList[];
}

export default function Sidebar({ todolists }: SidebarListProps) {
	return (
		<>
			<SidebarWrapper>
				<SidebarContent todolists={todolists} />
			</SidebarWrapper>
		</>
	);
}
