'use client';

import { Button } from '@/components/ui-shared/Button';

export default function NewTodolistButton() {
	return (
		<Button ariaLabel="add new list" className="bg-slate-700 text-white w-10/12 h-9 mx-auto">
			New List
		</Button>
	);
}
