export function extractCategory(title: string): string[] {
	const regex = /#(\S+)/g; // patterns like "#work #urgent #school"
	let categories: string[] = [];
	let match: RegExpExecArray | null;

	while ((match = regex.exec(title)) !== null) {
		// return null if it doesnt find # and reaches the end of string
		categories.push(match[1]);
		// match[0] -> #(\S+); -> "#work"
		// match[1] -> (\S+) "work"
	}

	return categories; // ['work', 'urgent', 'school']
}

export function extractTitle(title: string): string {
	const parts = title.split(' ');
	const filtered = parts.filter(part => !part.startsWith('#'));
	return filtered.join(' ').trim();
}
