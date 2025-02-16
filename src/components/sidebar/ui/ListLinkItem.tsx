'use client';

import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface ListLinkItemProps {
	children: React.ReactNode;
	queryParam: string;
	value: string;
	Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export default function ListLinkItem({ children, queryParam, value, Icon }: ListLinkItemProps) {
	const searchParams = useSearchParams();
	const currentQueryParamValue = searchParams.get(queryParam);
	const isSelectedPath = currentQueryParamValue === value;
	const { setSelectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	const urlWithSearchParams = localStorage.getItem(`searchParams-${value}`);

	const handleClick = () => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		if (mediaQuery.matches) {
			toggleTodoListsSidebar();
		}
		setSelectedTodoId(0);
	};

	return (
		<div
			className={`flex items-center relative mx-auto transition-all rounded-md duration-200  ${
				isSelectedPath
					? 'border-slate-500 bg-slate-200'
					: 'border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200'
			}`}
		>
			<Link
				href={urlWithSearchParams || `/tasks/?${queryParam}=${value}`}
				onClick={handleClick}
				className="flex items-center py-1 px-2 gap-2"
			>
				<Icon size={20} className="text-slate-600" />
				<div className={`${isSelectedPath ? 'font-bold' : 'font-normal'} text-ellipsis overflow-hidden w-[200px]`}>
					{children}
				</div>
			</Link>
		</div>
	);
}
