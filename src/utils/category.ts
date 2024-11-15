export function extractCategory(title: string): string[] {
	const regex = /#(\S+)/g;
	let categories: string[] = [];
	let match: RegExpExecArray | null;

	while ((match = regex.exec(title)) !== null) {
		categories.push(match[1]);
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
