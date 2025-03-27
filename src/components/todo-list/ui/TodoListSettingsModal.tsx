'use client';

import Button from '@/components/ui-shared/Button';
import Selection from '@/components/ui-shared/Selection';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import BehaviorSection from './BehaviorSection';

interface TodoListSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	todolistTitle: string;
}

type SectionComponents = {
	[key: string]: React.ComponentType<any>;
};

const sectionComponentMap: SectionComponents = {
	behavior: BehaviorSection,
};

const settings = ['Behavior', 'Appearance', 'Categories'];

export default function TodoListSettingsModal({ isOpen, onClose, todolistTitle }: TodoListSettingsModalProps) {
	const portalRootRef = useRef<HTMLElement | null>(null);
	const [settingSection, setSettingSection] = useState(settings[0].toLowerCase());
	const SectionComponent = sectionComponentMap[settingSection];

	useEffect(() => {
		portalRootRef.current = document.getElementById('modal-root');
	}, []);

	if (!isOpen || !portalRootRef.current) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
			role="dialog"
			aria-modal="true"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 space-y-2"
				onClick={e => e.stopPropagation()}
			>
				<h2 className="text-xl font-semibold">TodoList Settings</h2>
				<Button className="absolute top-5 right-4" onClick={onClose} ariaLabel="Close Modal">
					<X />
				</Button>
				<p className="text-sm text-slate-600">Customize the appearance and behavior of "{todolistTitle}" list.</p>
				<Selection options={settings} selectedOption={settingSection} setSelectedOption={setSettingSection} />
				{SectionComponent ? <SectionComponent /> : <p className="text-center text-slate-600">Section not found</p>}
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
