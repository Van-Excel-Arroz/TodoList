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
			<div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6" aria-labelledby="modal-title">
				<Button className="absolute top-4 right-4" onClick={onClose} ariaLabel="Close Modal">
					<X size={24} />
				</Button>
				<h2 id="modal-title" className="text-xl font-semibold mb-4">
					TodoList Settings
				</h2>
				<div className="space-y-4">
					<p>Configure your TodoList settings</p>
					<div>
						<label className="block mb-2">Theme</label>
						<select className="w-full border rounded p-2">
							<option>Light</option>
							<option>Dark</option>
						</select>
					</div>
					<div>
						<label className="block mb-2">Default View</label>
						<select className="w-full border rounded p-2">
							<option>List</option>
							<option>Grid</option>
						</select>
					</div>
				</div>

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
