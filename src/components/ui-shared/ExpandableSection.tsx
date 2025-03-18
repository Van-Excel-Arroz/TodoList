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
	className?: string;
}

function ExpandableSection({
	children,
	isEmpty,
	title,
	itemCount = 0,
	view = 'list',
	className,
}: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div
			className={`${
				view === 'grid' ? 'border border-slate-300 p-2 rounded-md' : ''
			} ${className} flex flex-col items-start gap-1 mb-4 `}
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

			<motion.div
				className="overflow-hidden w-full"
				initial={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				animate={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				{view === 'grid' ? (
					<div className="grid grid-cols-12 gap-2 w-full text-sm pb-2 pl-40 text-slate-600 font-bold">
						<p className="col-span-5">Task</p>
						<p className="col-span-2 text-center">Due Date</p>
						<p className="col-span-3">Category</p>
						<p className="col-span-1 text-center">Importance</p>
					</div>
				) : null}
				{children}
			</motion.div>
		</div>
	);
}

export default memo(ExpandableSection);
