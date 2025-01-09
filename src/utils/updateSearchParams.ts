import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function updateSearchParams(field: string | null, value: string = '') {
	const params = new URLSearchParams(useSearchParams().toString());
	field ? params.set(`${field}`, value) : params.delete(`${field}`);
	useRouter().push(`/tasks/?${params.toString()}`);
}
