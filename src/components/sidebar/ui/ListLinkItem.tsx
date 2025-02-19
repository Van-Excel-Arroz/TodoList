'use client';

import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import useQueryParams from '@/hooks/useQueryParams';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';

interface ListLinkItemProps {
	children: React.ReactNode;
	queryParam: string;
	value: string;
	todolistId?: string;
	Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export default function ListLinkItem({ children, queryParam, value, todolistId = '0', Icon }: ListLinkItemProps) {
	const searchParams = useSearchParams();
	const currentQueryParamValue = searchParams.get(queryParam);
	const isSelectedPath = currentQueryParamValue === value;
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const { updateSearchParams, getStoredParams } = useQueryParams();

	const [urlWithSearchParams, setUrlWithSearchParams] = useState<string | null>(null);

	useEffect(() => {
		const storedUrl = getStoredParams(todolistId);
		setUrlWithSearchParams(storedUrl || `/tasks/?${queryParam}=${value}`);
	}, [todolistId, queryParam, value]);

	const handleClick = () => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
		setSelectedTodoId(0);
		updateSearchParams(queryParam, value, todolistId);
	};

	return (
		<div
			className={`flex items-center relative mx-auto rounded-md transition-all duration-100  ${
				isSelectedPath
					? 'border-slate-500 bg-slate-200'
					: 'border-slate-200 hover:bg-slate-200 hover:border-slate-300 active:bg-slate-300'
			}`}
		>
			<Link
				href={urlWithSearchParams || `/tasks/?${queryParam}=${value}`}
				onClick={handleClick}
				className="flex items-center py-1 px-2 gap-2"
			>
				<Icon size={20} className="text-slate-600" />
				<div className={`${isSelectedPath ? 'font-bold' : 'font-normal'} text-ellipsis overflow-hidden w-[195px]`}>
					{children}
				</div>
			</Link>
		</div>
	);
}
