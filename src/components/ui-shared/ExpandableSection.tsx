'use client';

import Button from '@/components/ui-shared/Button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { memo, useState } from 'react';

interface ExpandableSectionProps {
	children: React.ReactNode;
	isEmpty: boolean;
	title: string;
	itemCount?: number;
	view?: string;
}

function ExpandableSection({ children, isEmpty, title, itemCount = 0, view = 'list' }: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div
			className={`${
				view === 'grid' ? 'border border-slate-300 p-2 rounded-md' : ''
			} flex flex-col items-start gap-1 mb-4 `}
		>
			<div className="flex items-center w-full mx-1 gap-1">
				<Button ariaLabel="Toggle Expand Section" onClick={() => setIsOpen(prev => !prev)} disabled={isEmpty}>
					<div className={`transition-transform duration-200 ease-in-out ${isOpen && !isEmpty ? 'rotate-180' : ''}`}>
						<ChevronDown size={20} />
					</div>
				</Button>
				<div className="flex items-center gap-2">
					<p className="font-bold">{title}</p>
					{itemCount > 0 ? <p className="text-sm text-slate-600">({itemCount})</p> : null}
				</div>
			</div>
			{view === 'grid' ? (
				<div className="grid grid-cols-12 gap-2 w-full text-sm pl-10 pr-3 text-slate-600">
					<p className="col-span-6">Task</p>
					<p className="col-span-2 text-center">Due Date</p>
					<p className="col-span-3 text-center">Category</p>
					<p className="col-span-1 text-center">Importance</p>
				</div>
			) : null}
			<motion.div
				className="overflow-hidden w-full"
				initial={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				animate={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				{children}
			</motion.div>
		</div>
	);
}

export default memo(ExpandableSection);
