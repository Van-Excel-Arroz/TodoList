'use client';

import { Clock3, Star, Tags } from 'lucide-react';
import ExpandableSection from '../../ui-shared/ExpandableSection';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ListLinkItem from '../ui/ListLinkItem';
import { itemVariants } from '@/utils/framer-motion';

const SmartLists = [
	{ icon: Star, text: 'Priority' },
	{ icon: Clock3, text: 'Upcoming' },
	{ icon: Tags, text: 'Tagged' },
];

export default function SmartTodolistContainer() {
	return (
		<ExpandableSection isEmpty={false} title="Smart Lists" className="mt-2">
			<ul className="flex flex-col gap-2 w-full">
				<AnimatePresence>
					{SmartLists.map((smartList, index) => (
						<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate" exit="exit">
							<ListLinkItem queryParam="smart-list" value={smartList.text.toLowerCase()} Icon={smartList.icon}>
								{smartList.text}
							</ListLinkItem>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</ExpandableSection>
	);
}
