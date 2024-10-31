import Sidebar from '@/components/Sidebar/Sidebar';

export default function LeftLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
}
