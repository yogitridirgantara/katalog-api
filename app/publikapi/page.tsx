"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Product = {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	category: string;
	brand: string;
	size_options: string[];
	color_options: string[];
	image_url: string;
	availability: string;
};

const productsData = {
	status: "success",
	products: [
		{
			id: 1,
			name: "Adidas UltraBoost 23",
			description:
				"Running shoes designed for comfort and energy return.",
			price: 180,
			currency: "USD",
			category: "Footwear",
			brand: "Adidas",
			size_options: ["6", "7", "8", "9", "10", "11", "12"],
			color_options: ["Black", "White", "Red", "Blue"],
			image_url:
				"https://tse4.mm.bing.net/th/id/OIP.D5eev-erP8k_KRDZ5tS7kQHaE8?rs=1&pid=ImgDetMain",
			availability: "In Stock",
		},
		{
			id: 2,
			name: "Adidas Originals Trefoil Hoodie",
			description: "A classic hoodie with a bold Trefoil logo.",
			price: 65,
			currency: "USD",
			category: "Apparel",
			brand: "Adidas",
			size_options: ["S", "M", "L", "XL", "XXL"],
			color_options: ["Black", "Gray", "Navy"],
			image_url:
				"https://www.manelsanchez.pt/uploads/media/images/adidas-originals-trefoil-hoodie-w-black-white-1.jpg",
			availability: "In Stock",
		},
		{
			id: 3,
			name: "Adidas Adizero F50 Soccer Cleats",
			description:
				"Lightweight soccer cleats designed for speed and agility.",
			price: 130,
			currency: "USD",
			category: "Footwear",
			brand: "Adidas",
			size_options: ["7", "8", "9", "10", "11"],
			color_options: ["Yellow", "White", "Black"],
			image_url:
				"https://th.bing.com/th/id/R.dde13dca782dfa054bff13bbd620b89b?rik=vIFVUoP3VTa9Pw&riu=http%3a%2f%2fd3d71ba2asa5oz.cloudfront.net%2f33000138%2fimages%2fm22253a.jpg&ehk=7k3Les133vyhUcyYD%2bLydYY6y1H8SuFrT7M8f78uTaU%3d&risl=&pid=ImgRaw&r=0",
			availability: "Out of Stock",
		},
		{
			id: 4,
			name: "Adidas Predator Edge+ Soccer Ball",
			description:
				"Durable soccer ball designed for precision and control.",
			price: 45,
			currency: "USD",
			category: "Accessories",
			brand: "Adidas",
			size_options: ["5"],
			color_options: ["White", "Black", "Red"],
			image_url:
				"https://tse3.mm.bing.net/th/id/OIP.EdrCV-wXMjOgJ3VMEZaJrAHaHa?rs=1&pid=ImgDetMain",
			availability: "In Stock",
		},
		{
			id: 5,
			name: "Adidas NMD_R1 Shoes",
			description:
				"Stylish sneakers with a comfortable, responsive fit.",
			price: 120,
			currency: "USD",
			category: "Footwear",
			brand: "Adidas",
			size_options: ["6", "7", "8", "9", "10", "11", "12"],
			color_options: ["Black", "White", "Gray", "Green"],
			image_url:
				"https://assets.adidas.com/images/w_1880,f_auto,q_auto/0fd9bc2bfc234ce0b69aaef900fddbdf_9366/HQ4452_01_standard.jpg",
			availability: "In Stock",
		},
	],
};

const HomePage = () => {
	const products: Product[] = productsData.products;

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
				Daftar Produk Adidas
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{products.map((product) => (
					<div
						key={product.id}
						data-aos="fade-up"
						className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
					>
						<img
							src={product.image_url}
							alt={product.name}
							className="w-full h-48 object-cover rounded-lg mb-4"
						/>
						<h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
							{product.name}
						</h2>
						<p className="text-gray-600 mb-2">
							{product.description}
						</p>
						<p className="text-gray-600 mb-1">
							<span className="font-medium">
								Kategori:
							</span>{" "}
							{product.category}
						</p>
						<p className="text-gray-600 mb-1">
							<span className="font-medium">Harga:</span>{" "}
							{product.currency}{" "}
							{product.price.toLocaleString()}
						</p>
						<p className="text-gray-600">
							<span className="font-medium">
								Ketersediaan:
							</span>{" "}
							{product.availability}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
