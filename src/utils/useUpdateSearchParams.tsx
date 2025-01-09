import { useSearchParams, useRouter } from 'next/navigation';

export default function useUpdateSearchParams() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateSearchParams = (field: string, value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		value ? params.set(`${field}`, value) : params.delete(`${field}`);
		router.push(`/tasks/?${params.toString()}`);
	};

	return updateSearchParams;
}
