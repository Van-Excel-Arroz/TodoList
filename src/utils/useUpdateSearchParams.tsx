import { useSearchParams, useRouter } from 'next/navigation';

export default function useUpdateSearchParams() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateSearchParams = (field: string | null, value: string = '') => {
		const params = new URLSearchParams(searchParams.toString());
		field ? params.set(`${field}`, value) : params.delete(`${field}`);
		router.push(`/tasks/?${params.toString()}`);
	};

	return updateSearchParams;
}
