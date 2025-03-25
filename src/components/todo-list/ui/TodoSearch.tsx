import Button from '@/components/ui-shared/Button';
import useQueryParams from '@/hooks/useQueryParams';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function TodoSearch() {
	const { register, handleSubmit } = useForm();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [id] = getQueryParam('id');
	const [search] = getQueryParam('search');

	const onSubmit = (data: any) => {
		if (data.search !== '') {
			updateSearchParams('search', data.search, id);
		}
	};

	const clearSearch = () => {
		updateSearchParams('search', null, id);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex items-center gap-2 px-2 py-1 outline outline-1 outline-slate-300 rounded-md hover:outline-slate-400 focus-within:!outline-1  focus-within:!outline-slate-600"
		>
			<Button ariaLabel="Search" type="submit">
				<Search size={18} className="text-slate-600" />
			</Button>
			<input
				{...register('search')}
				type="text"
				autoComplete="off"
				className="px-2 text-sm focus:outline-none bg-transparent"
				placeholder={search || 'Search tasks...'}
				defaultValue={search}
			/>
			<Button ariaLabel="Clear Search" onClick={() => clearSearch()} disabled={search ? false : true}>
				<X size={18} />
			</Button>
		</form>
	);
}
