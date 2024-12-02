import useRightSidebarStore from '@/context/RightSidebarContext';
import { ArrowBigRightDashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RightSidebarHeader() {
	const { closeRightSidebar } = useRightSidebarStore();
	const router = useRouter();

	const handleOnClick = () => {
		closeRightSidebar();
	};

	return (
		<button onClick={closeRightSidebar} aria-label="Close Todo Menu">
			<ArrowBigRightDashIcon />
		</button>
	);
}
