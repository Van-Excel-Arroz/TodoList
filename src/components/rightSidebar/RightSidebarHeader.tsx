import useRightSidebarStore from '@/context/RightSidebarContext';
import { ArrowBigRightDashIcon } from 'lucide-react';

export default function RightSidebarHeader() {
	const { closeRightSidebar } = useRightSidebarStore();

	return (
		<button onClick={closeRightSidebar} aria-label="Close Todo Menu">
			<ArrowBigRightDashIcon />
		</button>
	);
}
