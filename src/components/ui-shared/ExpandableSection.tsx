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
	titleClass?: string;
}

function ExpandableSection({
	children,
	isEmpty,
	title,
	itemCount = 0,
	view = 'list',
	className,
	titleClass,
}: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const isEffectivelyOpen = isOpen && !isEmpty;

	return (
		<div
			className={`${
				view === 'grid' ? 'border border-slate-300 p-2 rounded-md' : ''
			} ${className} flex flex-col items-start gap-1`}
		>
			<div className="flex items-center w-full mx-1 gap-1">
				<Button ariaLabel="Toggle Expand Section" onClick={() => setIsOpen(prev => !prev)} disabled={isEmpty}>
					<div className={`transition-transform duration-200 ease-in-out ${isEffectivelyOpen ? '' : '-rotate-90'}`}>
						<ChevronDown size={20} />
					</div>
				</Button>
				<div className="flex items-center gap-2">
					<p className={`${titleClass}`}>{title}</p>
					{itemCount > 0 ? <p className="text-sm text-slate-600">({itemCount})</p> : null}
				</div>
			</div>

			<motion.div
				className="overflow-hidden w-full"
				initial={{ height: isEffectivelyOpen ? 'auto' : 0 }}
				animate={{ height: isEffectivelyOpen ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				{children}
			</motion.div>
		</div>
	);
}

export default memo(ExpandableSection);
