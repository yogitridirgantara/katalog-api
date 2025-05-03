"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gradient-to-r from-pink-700 to-purple-950 h-14 flex justify-between items-center px-5 text-white relative">
			<h1 className="font-bold italic">After UTS</h1>

			{/* Desktop Menu */}
			<ul className="hidden md:flex md:items-center md:space-x-5">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/dataapi">API</Link>
				</li>
				<li>
					<Link href="/publikapi">Publik API</Link>
				</li>
				<li>
					<Link href="/katalogonline">Katalog</Link>
				</li>
				
			</ul>

			{/* Toggle Button for Mobile */}
			<button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Mobile Menu */}
			{isOpen && (
				<ul className="absolute top-14 left-0 w-full bg-purple-950 flex flex-col items-center space-y-3 py-3 md:hidden">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/dataapi">API</Link>
					</li>
					<li>
					<Link href="/publikapi">Publik API</Link>
				</li>
				<li>
					<Link href="/katalogonline">Katalog</Link>
				</li>
				</ul>
			)}
		</nav>
	);
}
