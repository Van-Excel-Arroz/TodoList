import { useSearchParams, useRouter } from 'next/navigation';

export default function updateSearchParams(field: string | null, value: string = '') {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	field ? params.set(`${field}`, value) : params.delete(`${field}`);
	useRouter().push(`/tasks/?${params.toString()}`);
}
