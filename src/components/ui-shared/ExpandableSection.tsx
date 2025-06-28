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
	className?: string;
	titleClass?: string;
}

function ExpandableSection({ children, isEmpty, title, itemCount = 0, className, titleClass }: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const isEffectivelyOpen = isOpen && !isEmpty;

	return (
		<div className={`${className}`}>
			<div className="flex items-center w-full mx-1 gap-1">
				<Button
					ariaLabel="Toggle Expand Section"
					onClick={() => setIsOpen(prev => !prev)}
					disabled={isEmpty}
					focusStyle={false}
				>
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
				className="w-full overflow-hidden"
				initial={false}
				animate={{ height: isEffectivelyOpen ? 'auto' : 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				{children}
			</motion.div>
		</div>
	);
}

export default memo(ExpandableSection);
