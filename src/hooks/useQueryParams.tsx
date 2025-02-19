import { useSearchParams, useRouter } from 'next/navigation';

export default function useQueryParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const getQueryParam = (field: string) => {
		const value = searchParams.get(field);
		return value?.split(':') || [];
	};

	const updateSearchParams = (field: string, value: string | null, todolistId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(field, value);
		} else {
			params.delete(field);
		}

		const newUrl = `/tasks/?${params.toString()}`;
		router.push(newUrl);

		// Store the complete state of filters for this todolist
		const storedFilters = {
			url: newUrl,
			timestamp: Date.now(),
		};
		localStorage.setItem(`todolist-filters-${todolistId}`, JSON.stringify(storedFilters));
	};

	const getStoredParams = (todolistId: string) => {
		const stored = localStorage.getItem(`todolist-filters-${todolistId}`);
		if (stored) {
			const { url, timestamp } = JSON.parse(stored);
			// Optionally: check if stored filters are still valid (e.g., not too old)
			return url;
		}
		return null;
	};

	return {
		getQueryParam,
		updateSearchParams,
		getStoredParams,
	};
}
