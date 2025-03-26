'use client';

import Button from '@/components/ui-shared/Button';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface TodoListSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	todolistTitle: string;
}

export default function TodoListSettingsModal({ isOpen, onClose, todolistTitle }: TodoListSettingsModalProps) {
	const portalRootRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		portalRootRef.current = document.getElementById('modal-root');
	});

	if (!isOpen || !portalRootRef.current) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
			role="dialog"
			aria-modal="true"
			onClick={onClose}
		>
			<div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6" onClick={e => e.stopPropagation()}>
				<h2 className="text-xl font-semibold mb-4">TodoList Settings</h2>
				<p className="text-sm text-slate-600">Customize the appearance and behavior of "{todolistTitle}" list.</p>
				<Button className="absolute top-5 right-4" onClick={onClose} ariaLabel="Close Modal">
					<X />
				</Button>
				<div className="mt-6 flex justify-end space-x-2">
					<Button ariaLabel="Close Settings" onClick={onClose}>
						Cancel
					</Button>
					<Button ariaLabel="Save Settings" darkMode={true} className="px-2">
						Save Settings
					</Button>
				</div>
			</div>
		</div>,
		portalRootRef.current
	);
}
