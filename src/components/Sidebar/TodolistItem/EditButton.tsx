import { memo } from 'react';
import { RiPencilFill } from 'react-icons/ri';

interface EditButtonProps {
	handleEditClick: (val: boolean) => void;
}

function EditButton({ handleEditClick }: EditButtonProps) {
	return (
		<button onClick={() => handleEditClick(true)}>
			<RiPencilFill size={16} />
		</button>
	);
}

export default memo(EditButton);
