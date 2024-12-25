export default function TodoDescription() {
	return (
		<div className="flex flex-col items-start">
			<p className="text-slate-600 pb-2">Description</p>
			<textarea className="w-full border border-slate-300 p-2 rounded-md focus:outline-none" />
		</div>
	);
}
