import { CircleX } from 'lucide-react';
import { memo } from 'react';

interface CancelEditButtonProps {
	handleEditClick: (val: boolean) => void;
}

function CancelEditButton({ handleEditClick }: CancelEditButtonProps) {
	return (
		<button onClick={() => handleEditClick(false)} aria-label="Cancel Editing">
			<CircleX size={15} />
		</button>
	);
}

export default memo(CancelEditButton);
