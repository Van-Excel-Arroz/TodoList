import useQueryParams from '@/hooks/useQueryParams';
import Button from './Button';
import { Grid2X2, ListTodo } from 'lucide-react';

export default function LayoutButtons({ param }: { param: string }) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [smartList] = getQueryParam(param);

	const isLayoutSelected = (layout: string) => {
		const [view] = getQueryParam('view');
		if (view === layout) return true;
		else return false;
	};

	return (
		<div className="flex items-center gap-1 outline outline-1 outline-slate-300 rounded-md p-1 hover:outline-slate-400">
			<Button
				ariaLabel="Grid Layout"
				isActive={isLayoutSelected('grid')}
				onClick={() => updateSearchParams('view', 'grid', smartList)}
			>
				<Grid2X2 size={18} />
			</Button>
			<Button
				ariaLabel="List Layout"
				isActive={isLayoutSelected('list')}
				onClick={() => updateSearchParams('view', 'list', smartList)}
			>
				<ListTodo size={18} />
			</Button>
		</div>
	);
}
