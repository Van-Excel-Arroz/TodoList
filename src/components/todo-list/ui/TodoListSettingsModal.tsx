import Button from '@/components/ui-shared/Button';
import { X } from 'lucide-react';

interface TodoListSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function TodoListSettingsModal({ isOpen, onClose }: TodoListSettingsModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
			role="dialog"
			aria-modal="true"
		>
			<div className="relative w-full max-w-xl bg-white rounded-lg shadow-xl p-6">
				<h2 className="text-xl font-semibold mb-4">TodoList Settings</h2>
				<Button className="absolute top-5 right-4" onClick={onClose} ariaLabel="Close Modal">
					<X />
				</Button>
				<div className="mt-6 flex justify-end space-x-2">
					<Button ariaLabel="Close Settings" onClick={onClose}>
						Cancel
					</Button>
					<Button ariaLabel="Save Settings">Save Settings</Button>
				</div>
			</div>
		</div>
	);
}
