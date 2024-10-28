export function extractCategory(title: string): string {
	let categories: string = '';
	let category: string = '';

	for (let i = 0; i < title.length; i++) {
		if (title[i] === '#') {
			category = ' ';
			while (i + 1 < title.length && title[i + 1] !== ' ') {
				i++;
				category += title[i];
			}
			categories += category;
		}
	}

	return categories.trim();
}

export function removeCategories(title: string): string {
	let removedCategories = '';

	for (let i = 0; i < title.length; i++) {
		if (title[i] === '#') break;
		removedCategories += title[i];
	}

	return removedCategories.trim();
}
