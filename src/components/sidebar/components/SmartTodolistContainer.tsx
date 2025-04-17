'use client';

import { Clock3, Star, Tags } from 'lucide-react';
import ExpandableSection from '../../ui-shared/ExpandableSection';
import ListLinkItem from '../ui/ListLinkItem';

const SmartLists = [
	{ icon: Star, text: 'Priority' },
	{ icon: Clock3, text: 'Upcoming' },
	{ icon: Tags, text: 'Tagged' },
];

export default function SmartTodolistContainer() {
	return (
		<ExpandableSection isEmpty={false} title="Smart Lists" className="mb-0 py-3 px-5 border-b border-slate-300">
			<ul className="flex flex-col gap-2 w-full">
				{SmartLists.map((smartList, index) => (
					<li key={index}>
						<ListLinkItem queryParam="smart-list" itemId={smartList.text.toLowerCase()} Icon={smartList.icon}>
							{smartList.text}
						</ListLinkItem>
					</li>
				))}
			</ul>
		</ExpandableSection>
	);
}
