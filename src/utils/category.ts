export function extractCategory(title: string): string[] {
	let categories: string[] = [];
	let category: string = '';

	for (let i = 0; i < title.length; i++) {
		if (title[i] === '#') {
			category = ' ';
			while (i + 1 < title.length && title[i + 1] !== ' ') {
				i++;
				category += title[i];
			}
			categories.push(category);
		}
	}

	return categories;
}

export function extractTitle(title: string): string {
	let extractTitle = '';

	for (let i = 0; i < title.length; i++) {
		if (title[i] === '#') break;
		extractTitle += title[i];
	}

	return extractTitle.trim();
}
