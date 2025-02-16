import { Button } from '@/components/ui-shared/Button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ExpandableSectionProps {
	children: React.ReactNode;
	isEmpty: boolean;
}

export default function ExpandableSection({ children, isEmpty }: ExpandableSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div className="flex flex-col items-start gap-1 w-full mx-auto">
			<div className="flex items-center w-full mx-auto">
				<Button ariaLabel="Toggle Todo Section" onClick={() => setIsOpen(prev => !prev)} disabled={isEmpty}>
					<div className={`transition-transform duration-200 ease-in-out ${isOpen && !isEmpty ? 'rotate-180' : ''}`}>
						<ChevronDown size={20} />
					</div>
				</Button>
				<p className="mr-3 ml-1 text-slate-600">Lists</p> <hr className="border border-slate-200 w-full" />
			</div>

			<motion.div
				className="overflow-hidden"
				initial={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				animate={{ height: isOpen && !isEmpty ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				{children}
			</motion.div>
		</div>
	);
}
