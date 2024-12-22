interface RightSidebarFooterProps {
	creationDate: string;
}

export default function TodoDetailsFooter({ creationDate }: RightSidebarFooterProps) {
	return (
		<div className="absolute border-t-2 border-slate-200 bottom-0 left-0 w-full h-14 pr-6 pl-4 bg-slate-100 flex items-center justify-between">
			{creationDate && (
				<p className="text-sm text-slate-600">Created at: {new Date(creationDate).toLocaleDateString()} </p>
			)}
		</div>
	);
}
