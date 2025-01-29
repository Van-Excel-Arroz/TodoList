'use client';

import { Button } from '@/components/ui-shared/Button';

export default function NewTodolistButton() {
	return (
		<Button ariaLabel="add new list" darkMode={true} className="w-full h-9 mx-auto">
			New List
		</Button>
	);
}
