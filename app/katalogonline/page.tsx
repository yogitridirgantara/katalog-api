"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
	FaCartPlus,
	FaDollarSign,
	FaShoppingCart,
	FaTimes,
} from "react-icons/fa";

// Define interface untuk Produk
interface Product {
	id: number;
	title: string;
	image: string;
	price: number;
	quota: number;
}

// State untuk produk dan keranjang
export default function KatalogPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<{ [id: number]: number }>({});
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Fetch data produk dari API dan atur kuota produk
	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((data) => {
				// Map data dan atur kuota produk secara acak
				const updated = data.map((item: Product) => ({
					...item,
					quota: Math.floor(Math.random() * 5) + 1,
				}));
				setProducts(updated);
			});
	}, []);

	// Menambahkan produk ke keranjang
	const handleAddToCart = (product: Product) => {
		if (product.quota === 0) return;

		setCart((prev) => ({
			...prev,
			[product.id]: (prev[product.id] || 0) + 1,
		}));

		setProducts((prev) =>
			prev.map((p) =>
				p.id === product.id ? { ...p, quota: p.quota - 1 } : p
			)
		);
	};

	// Menghapus atau mengurangi produk dari keranjang
	const removeItem = (id: number) => {
		const currentQty = cart[id];

		if (currentQty > 1) {
			setCart((prev) => ({
				...prev,
				[id]: currentQty - 1,
			}));

			setProducts((prev) =>
				prev.map((p) =>
					p.id === id ? { ...p, quota: p.quota + 1 } : p
				)
			);
		} else {
			setCart((prev) => {
				const rest = Object.fromEntries(
					Object.entries(prev).filter(
						([key]) => Number(key) !== id
					)
				);
				return rest;
			});

			setProducts((prev) =>
				prev.map((p) =>
					p.id === id ? { ...p, quota: p.quota + 1 } : p
				)
			);
		}
	};

	// Menyiapkan item keranjang untuk ditampilkan
	const cartItems = Object.entries(cart)
		.map(([id, qty]) => {
			const product = products.find((p) => p.id === Number(id));
			return product ? { ...product, qty } : null;
		})
		.filter(Boolean) as (Product & { qty: number })[];

	return (
		<div className="relative">
			<div
				className={`transition-all duration-300 p-4 ${
					isCartOpen
						? "blur-sm pointer-events-none select-none"
						: ""
				}`}
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="border rounded-xl p-4 shadow-md"
						>
							<Image
								src={product.image}
								alt={product.title}
								width={200}
								height={200}
								className="h-48 w-auto mx-auto object-contain"
							/>
							<h2 className="font-semibold mt-2 text-sm text-black">
								{product.title}
							</h2>
							<p className="flex items-center text-green-600 mt-1">
								<FaDollarSign className="mr-1" />{" "}
								{product.price}
							</p>
							<p className="text-sm text-gray-500">
								Kuota: {product.quota}
							</p>
							<button
								disabled={product.quota === 0}
								className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white ${
									product.quota === 0
										? "bg-gray-400 cursor-not-allowed"
										: "bg-blue-500 hover:bg-blue-600"
								}`}
								onClick={() => handleAddToCart(product)}
							>
								<FaCartPlus />
								Add to Cart
							</button>
						</div>
					))}
				</div>

				{/* Cart Icon */}
				<button
					onClick={() => setIsCartOpen(true)}
					className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center gap-1 z-50 hover:bg-blue-700"
				>
					<FaShoppingCart />
					<span>{Object.keys(cart).length}</span>
				</button>
			</div>

			{/* Modal Cart */}
			{isCartOpen && (
				<div className="fixed inset-0 bg-opacity-40 z-50 flex justify-end">
					<div className="bg-white w-full sm:w-[400px] h-full p-9 overflow-auto shadow-lg text-black">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">
								Detail Cart
							</h2>
							<button
								onClick={() => setIsCartOpen(false)}
								className="text-gray-600 hover:text-black"
								aria-label="Close Cart"
							>
								<FaTimes size={20} />
							</button>
						</div>
						{cartItems.length === 0 ? (
							<p className="text-gray-500">Cart kosong.</p>
						) : (
							cartItems.map((item) => (
								<div
									key={item.id}
									className="border p-3 mb-3 rounded-lg"
								>
									<h3 className="font-medium text-sm">
										{item.title}
									</h3>
									<p className="text-green-600 text-sm">
										Harga: ${item.price}
									</p>
									<div className="flex items-center gap-2 mt-1">
										<label className="text-sm">
											Qty:
										</label>
										<span className="text-sm font-semibold">
											{item.qty}
										</span>
										<button
											className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-sm"
											onClick={() =>
												removeItem(item.id)
											}
										>
											{item.qty > 1
												? "Kurangi"
												: "Hapus"}
										</button>
									</div>
								</div>
							))
						)}
						<button
							onClick={() => setIsCartOpen(false)}
							className="mt-4 w-full text-center text-blue-500 hover:underline"
						>
							+ Tambah Produk
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
