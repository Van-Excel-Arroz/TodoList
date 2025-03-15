'use client';

import Button from '@/components/ui-shared/Button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { memo, useState } from 'react';

interface ExpandableSectionProps {
	children: React.ReactNode;
	isEmpty: boolean;
	title: string;
}

function ExpandableSection({ children, isEmpty, title }: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div className="flex flex-col items-start gap-1">
			<div className="flex items-center w-full mx-1 mb-2">
				<Button ariaLabel="Toggle Expand Section" onClick={() => setIsOpen(prev => !prev)} disabled={isEmpty}>
					<div className={`transition-transform duration-200 ease-in-out ${isOpen && !isEmpty ? 'rotate-180' : ''}`}>
						<ChevronDown size={20} />
					</div>
				</Button>
				<p className="mr-3 ml-1 font-bold">{title}</p>
			</div>

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
