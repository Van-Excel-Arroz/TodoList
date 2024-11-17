import { memo } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

interface CancelEditButtonProps {
	handleEditClick: (val: boolean) => void;
}

function CancelEditButton({ handleEditClick }: CancelEditButtonProps) {
	return (
		<button onClick={() => handleEditClick(false)} aria-label="Cancel Editing">
			<MdOutlineCancel size={16} />
		</button>
	);
}

export default memo(CancelEditButton);
