export default function SidebarContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="font-body sticky top-0 left-0 h-screen overflow-hidden w-1/3 border-r-2 rounded-r-3xl bg-white py-9">
			{children}
		</div>
	);
}
