'use client';

import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import ListIcon, { iconNameType } from './ListIcon';
import { SettingsToSave } from '@/utils/types';

interface ListLinkItemProps {
	children: React.ReactNode;
	queryParam: string;
	itemId: string;
	iconName: iconNameType;
}

function ListLinkItem({ children, queryParam, itemId, iconName }: ListLinkItemProps) {
	const searchParams = useSearchParams();
	const currentQueryParamValue = searchParams.get(queryParam);
	const isSelectedPath = currentQueryParamValue === itemId;
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const [queryString, setQueryString] = useState<string | null>(null);
	const [storedIcon, setStoredIcon] = useState<iconNameType | null>(null);

	useEffect(() => {
		const storedQueryString = localStorage.getItem(`searchParams-${itemId}`);
		setQueryString(storedQueryString);
	}, [itemId, searchParams]);

	useEffect(() => {
		const settingsFromStorage = localStorage.getItem(`todolistSettings-${itemId}`);
		if (settingsFromStorage) {
			const parseSettings: SettingsToSave = JSON.parse(settingsFromStorage);
			const icon = parseSettings.listIcon as iconNameType;
			setStoredIcon(icon);
		} else {
			setStoredIcon(null);
		}
	}, [itemId]);

	const handleClick = () => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
		setSelectedTodoId(0);
	};

	const defaultQueryString = `${queryParam}=${itemId}&view=list`;
	const href = `/tasks/?${queryString ?? defaultQueryString}`;

	return (
		<div
			className={`flex items-center relative mx-auto rounded-md transition-all duration-100  ${
				isSelectedPath
					? 'border-slate-500 bg-slate-200'
					: 'border-slate-200 hover:bg-slate-200 hover:border-slate-300 active:bg-slate-300'
			}`}
		>
			<Link href={href} onClick={handleClick} className="flex items-center py-1 px-2 gap-2">
				<ListIcon iconName={iconName || storedIcon || 'List'} />
				<div className={`${isSelectedPath ? 'text-black' : 'text-slate-700'} text-ellipsis overflow-hidden w-[195px]`}>
					{children}
				</div>
			</Link>
		</div>
	);
}

export default memo(ListLinkItem);
