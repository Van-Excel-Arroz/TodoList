'use client';

import { logoutUserAction } from '@/actions/user-action';
import Button from '@/components/ui-shared/Button';
import { LogOut } from 'lucide-react';

export default function Logout() {
	const handleLogout = async () => {
		await logoutUserAction();
	};

	return (
		<div className="flex border-t border-slate-300 px-5 py-4">
			<Button ariaLabel="Logout" className="flex items-center gap-4 p-2" onClick={handleLogout}>
				<LogOut />
				<p>Logout</p>
			</Button>
		</div>
	);
}
