'use client';

import Button from '@/components/ui-shared/Button';
import Selection from '@/components/ui-shared/Selection';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import BehaviorSection from './BehaviorSection';
import AppearanceSection from './AppearanceSection';
import CategoriesSection from './CategoriesSection';
import { AppearanceSettings, BehaviorSettings } from '@/utils/types';
import useQueryParams from '@/hooks/useQueryParams';
import _, { isEqual, merge } from 'lodash';

interface TodoListSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	todolistTitle: string;
}

const settings = ['Behavior', 'Appearance', 'Categories'];
const headerTextStyle = 'text-lg font-semibold text-slate-700';

export default function TodoListSettingsModal({ isOpen, onClose, todolistTitle }: TodoListSettingsModalProps) {
	const { getQueryParam } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [sortField, sortOrder] = getQueryParam('sort');
	const initialBehaviorSettings: BehaviorSettings = {
		filter: filterValue ?? null,
		sortField: sortField ?? null,
		sortOrder: (sortOrder as 'asc' | 'desc') ?? 'asc',
		completedTasks: 'Move to "Completed" Section',
		newTasksPosition: 'Add to Top',
		dueDateFormat: 'Relative (2 days left,  yesterday)',
	};
	const initialAppearanceSettings: AppearanceSettings = {
		accent: '#6b7280',
		listIcon: 'List',
		layout: 'List',
	};

	const portalRootRef = useRef<HTMLElement | null>(null);
	const [settingSection, setSettingSection] = useState(settings[0]);
	const [behaviorSettings, setBehaviorSettings] = useState<BehaviorSettings>(initialBehaviorSettings);
	const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(initialAppearanceSettings);

	const initialSettings = merge(initialBehaviorSettings, initialAppearanceSettings);
	const updatedSettings = merge(behaviorSettings, appearanceSettings);

	const renderSection = () => {
		if (!settingSection) return <p className="text-center text-slate-600">Section not found</p>;

		switch (settingSection) {
			case 'Behavior':
				return (
					<BehaviorSection
						headerTextStyle={headerTextStyle}
						settings={behaviorSettings}
						updateSetting={(key, value) => setBehaviorSettings(prev => ({ ...prev, [key]: value }))}
					/>
				);
			case 'Appearance':
				return (
					<AppearanceSection
						headerTextStyle={headerTextStyle}
						settings={appearanceSettings}
						updateSetting={(key, value) => setAppearanceSettings(prev => ({ ...prev, [key]: value }))}
					/>
				);
			case 'Categories':
				return <CategoriesSection headerTextStyle={headerTextStyle} />;
		}
	};

	const handleSave = () => {
		console.log(initialSettings);
		console.log(updatedSettings);
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
					<div className=" flex justify-end space-x-2">
						<Button ariaLabel="Close Settings" onClick={onClose}>
							Cancel
						</Button>
						<Button
							ariaLabel="Save Settings"
							darkMode={true}
							className="px-2"
							onClick={handleSave}
							disabled={isEqual(initialBehaviorSettings, behaviorSettings)}
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
