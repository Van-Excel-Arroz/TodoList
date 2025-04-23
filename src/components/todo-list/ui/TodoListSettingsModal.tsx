'use client';

import Button from '@/components/ui-shared/Button';
import Selection from '@/components/ui-shared/Selection';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import BehaviorSection from './BehaviorSection';
import AppearanceSection from './AppearanceSection';
import CategoriesSection from './CategoriesSection';
import useTodoListSettings from '@/hooks/useTodoListSettings';

interface TodoListSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	todolistTitle: string;
}

const settings = ['Behavior', 'Appearance', 'Categories'];
const headerTextStyle = 'text-lg font-semibold text-slate-700';

export default function TodoListSettingsModal({ isOpen, onClose, todolistTitle }: TodoListSettingsModalProps) {
	const portalRootRef = useRef<HTMLElement | null>(null);
	const [settingSection, setSettingSection] = useState(settings[0]);
	const { todoListSettings, setTodoListSettings, handleSaveSettings, isDirty } = useTodoListSettings();

	const renderSection = () => {
		if (!settingSection) return <p className="text-center text-slate-600">Section not found</p>;

		switch (settingSection) {
			case 'Behavior':
				return (
					<BehaviorSection
						headerTextStyle={headerTextStyle}
						settings={todoListSettings.behavior}
						updateSetting={(key, value) =>
							setTodoListSettings(prev => ({ ...prev, behavior: { ...prev.behavior, [key]: value } }))
						}
					/>
				);
			case 'Appearance':
				return (
					<AppearanceSection
						headerTextStyle={headerTextStyle}
						settings={todoListSettings.appearance}
						updateSetting={(key, value) =>
							setTodoListSettings(prev => ({ ...prev, appearance: { ...prev.appearance, [key]: value } }))
						}
					/>
				);
			case 'Categories':
				return <CategoriesSection headerTextStyle={headerTextStyle} />;
		}
	};

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
				className="relative w-full max-w-2xl h-[90vh] flex flex-col justify-between bg-white rounded-lg shadow-xl p-6"
				onClick={e => e.stopPropagation()}
			>
				<Button className="absolute top-5 right-4" onClick={onClose} ariaLabel="Close Modal">
					<X />
				</Button>
				<div className="space-y-6">
					<div className="space-y-2">
						<h2 className="text-xl font-semibold">TodoList Settings</h2>
						<p className="text-sm text-slate-600">Customize the appearance and behavior of "{todolistTitle}" list.</p>
					</div>
					<Selection options={settings} selectedOption={settingSection} setSelectedOption={setSettingSection} />
					<div className="flex flex-col gap-2 px-2 ">{renderSection()}</div>
				</div>
				{settingSection !== 'Categories' && (
					<div className=" flex justify-end gap-2">
						<Button ariaLabel="Close Settings" onClick={onClose}>
							Cancel
						</Button>
						<Button
							ariaLabel="Save Settings"
							darkMode={true}
							className="px-2"
							onClick={handleSaveSettings}
							disabled={!isDirty}
						>
							Save Settings
						</Button>
					</div>
				)}
			</div>
		</div>,
		portalRootRef.current
	);
}
