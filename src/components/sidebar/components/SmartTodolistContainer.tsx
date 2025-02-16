'use client';

import { Calendar, Clock3, Star, Tags } from 'lucide-react';
import ExpandableSection from '../ui/ExpandableSection';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ListLinkItem from '../ui/ListLinkItem';

const SmartLists = [
	{ icon: Star, text: 'Priority' },
	{ icon: Calendar, text: 'Today' },
	{ icon: Clock3, text: 'Upcoming' },
	{ icon: Tags, text: 'Tagged' },
];

const itemVariants = {
	initial: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.3, type: 'spring' },
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.2 },
	},
	animate: {
		opacity: 1,
		x: 0,
	},
};

export default function SmartTodolistContainer() {
	return (
		<ExpandableSection isEmpty={false} title="Smart Lists">
			<ul className="flex flex-col gap-2 w-full">
				<AnimatePresence>
					{SmartLists.map((smartList, index) => (
						<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate" exit="exit">
							<ListLinkItem queryParam="id" value={smartList.text.toLowerCase()} Icon={smartList.icon}>
								{smartList.text}
							</ListLinkItem>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</ExpandableSection>
	);
}
