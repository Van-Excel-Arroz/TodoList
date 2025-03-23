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
		<ExpandableSection isEmpty={false} title="Smart Lists" className="mt-2 px-6">
			<ul className="flex flex-col gap-2 w-full">
				{SmartLists.map((smartList, index) => (
					<li key={index}>
						<ListLinkItem queryParam="smart-list" value={smartList.text.toLowerCase()} Icon={smartList.icon}>
							{smartList.text}
						</ListLinkItem>
					</li>
				))}
			</ul>
		</ExpandableSection>
	);
}
