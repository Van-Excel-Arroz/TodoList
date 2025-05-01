'use client';

import ExpandableSection from '../../ui-shared/ExpandableSection';
import { iconNameType } from '../ui/ListIcon';
import ListLinkItem from '../ui/ListLinkItem';

const SmartLists = [
	{ iconName: 'Star', text: 'Priority' },
	{ iconName: 'Clock3', text: 'Upcoming' },
	{ iconName: 'Tags', text: 'Tagged' },
];

export default function SmartTodolistContainer() {
	return (
		<ExpandableSection isEmpty={false} title="Smart List" className="mb-0 py-3 px-5 border-b border-slate-300">
			<ul className="flex flex-col gap-2 w-full">
				{SmartLists.map((smartList, index) => (
					<li key={index}>
						<ListLinkItem
							queryParam="smart-list"
							itemId={smartList.text.toLowerCase()}
							iconName={smartList.iconName as iconNameType}
						>
							{smartList.text}
						</ListLinkItem>
					</li>
				))}
			</ul>
		</ExpandableSection>
	);
}
