import { Pencil } from 'lucide-react';
import { memo } from 'react';

interface EditButtonProps {
	handleEditClick: (val: boolean) => void;
}

function EditButton({ handleEditClick }: EditButtonProps) {
	return (
		<button onClick={() => handleEditClick(true)} aria-label="Edit Todolist">
			<Pencil size={15} />
		</button>
	);
}

export default memo(EditButton);
