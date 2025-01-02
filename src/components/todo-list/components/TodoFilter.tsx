'use client';

import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import { Filter } from 'lucide-react';
import { useRef } from 'react';

export default function TodoFilter() {
	return (
		<div className="relative">
			<Button ariaLabel="Filter">
				<Filter size={20} className="text-slate-600" />
			</Button>
			<Menu open={true} onClose={() => console.log('lol')} posX="-right-5" posXNotch="before:right-6" width="w-44">
				HELLO WORLD
			</Menu>
		</div>
	);
}
