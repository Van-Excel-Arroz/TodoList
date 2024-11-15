function extractCategory(title: string): string[] {
	const regex = /#(\S+?)(?=[ #]|$)/g; // Match # followed by non-whitespace until next space or #, or end of string
	let categories: string[] = [];
	let match: RegExpExecArray | null;

	while ((match = regex.exec(title)) !== null) {
		// return null if it doesnt find # and reaches the end of string
		categories.push(match[1]);
		// match[0] -> #(\S+); -> "#work"
		// match[1] -> (\S+) "work"
	}
	const removedDuplicates = Array.from(new Set(categories)); // remove duplicates using Set
	return removedDuplicates; // ['work', 'urgent', 'school']
}

function extractTitle(title: string): string {
	const parts = title.split(' ');
	const filtered = parts.filter(part => !part.startsWith('#'));
	return filtered.join(' ').trim();
}

const str = 'Do Homework #homework #homework';
console.log(str);
console.log(extractCategory(str));
console.log(extractTitle(str));
