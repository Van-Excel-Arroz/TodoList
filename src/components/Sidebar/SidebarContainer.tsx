export default function SidebarContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="font-body sticky top-0 left-0 h-screen overflow-hidden">
			<div className="border-r-2 rounded-r-3xl h-screen bg-white left-0 py-9">{children}</div>
		</div>
	);
}
