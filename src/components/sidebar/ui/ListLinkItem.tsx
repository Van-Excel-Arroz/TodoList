'use client';

import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ForwardRefExoticComponent, memo, RefAttributes, useEffect, useState } from 'react';

interface ListLinkItemProps {
	children: React.ReactNode;
	queryParam: string;
	itemId: string;
	Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

function ListLinkItem({ children, queryParam, itemId, Icon }: ListLinkItemProps) {
	const searchParams = useSearchParams();
	const currentQueryParamValue = searchParams.get(queryParam);
	const isSelectedPath = currentQueryParamValue === itemId;
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const [queryString, setQueryString] = useState<string | null>(null);

	useEffect(() => {
		const storedQueryString = localStorage.getItem(`searchParams-${itemId}`);
		setQueryString(storedQueryString);
	}, [itemId, searchParams]);

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
				{Icon && <Icon size={20} className="text-slate-600" />}
				<div className={`${isSelectedPath ? 'text-black' : 'text-slate-700'} text-ellipsis overflow-hidden w-[195px]`}>
					{children}
				</div>
			</Link>
		</div>
	);
}

export default memo(ListLinkItem);
