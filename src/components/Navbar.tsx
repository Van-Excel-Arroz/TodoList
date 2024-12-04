import { House } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
	return (
		<div className=" border-b-2 border-b-slate-200 drop-shadow-md bg-white h-14 px-6 flex items-center gap-4">
			<Link href="/" className="text-lg font-bold" aria-label="home">
				<House />
			</Link>
			<p>TodoList App</p>
		</div>
	);
}
