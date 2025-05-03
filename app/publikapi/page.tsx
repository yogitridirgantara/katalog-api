"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image"; // Mengimpor komponen Image dari Next.js

// Tipe data untuk produk
type Product = {
	id: number; // ID produk
	title: string; // Nama produk
	description: string; // Deskripsi produk
	price: number; // Harga produk
	category: string; // Kategori produk
	image: string; // URL gambar produk
	availability: string; // Ketersediaan produk
};

const HomePage = () => {
	const [products, setProducts] = useState<Product[]>([]); // Menyimpan data produk
	const [loading, setLoading] = useState<boolean>(true); // Status loading
	const [error, setError] = useState<string>(""); // Menyimpan pesan error jika ada

	useEffect(() => {
		// Fungsi untuk mengambil data produk dari API Fake Store kategori elektronik
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					"https://fakestoreapi.com/products/category/electronics"
				); // Mengambil data produk kategori elektronik
				if (!response.ok) {
					throw new Error("Gagal mengambil data produk");
				}
				const data: Product[] = await response.json(); // Mengonversi response ke format JSON dengan tipe yang benar
				// Menyesuaikan struktur data yang diterima dengan tipe Product
				const transformedProducts = data.map((product) => ({
					id: product.id,
					title: product.title,
					description: product.description,
					price: product.price,
					category: product.category,
					image: product.image,
					availability: "In Stock", // Mengatur ketersediaan produk (karena API tidak memberikan informasi ini)
				}));
				setProducts(transformedProducts); // Menyimpan data produk ke state
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message); // Menangani error jika ada masalah saat mengambil data
				} else {
					setError("Terjadi kesalahan yang tidak diketahui"); // Menangani error jika tipe error tidak sesuai
				}
			} finally {
				setLoading(false); // Set loading ke false setelah proses selesai
			}
		};

		fetchProducts(); // Memanggil fungsi untuk mengambil produk
		AOS.init({ duration: 1000, once: true }); // Menginisialisasi animasi AOS
	}, []);

	// Menampilkan loading jika data belum tersedia
	if (loading) {
		return <div>Loading...</div>;
	}

	// Menampilkan error jika ada masalah
	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="p-6">
			<h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
				Daftar Produk Elektronik
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* Menampilkan produk dalam grid */}
				{products.map((product) => (
					<div
						key={product.id}
						data-aos="fade-up" // Menambahkan animasi AOS untuk setiap produk
						className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
					>
						<Image
							src={product.image} // Menampilkan gambar produk
							alt={product.title} // Alt text untuk gambar
							className="w-full h-48 object-cover rounded-lg mb-4"
							width={500} // Menentukan lebar gambar untuk optimasi
							height={300} // Menentukan tinggi gambar untuk optimasi
							layout="responsive" // Menjaga rasio aspek gambar
						/>
						<h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
							{product.title}{" "}
							{/* Menampilkan nama produk */}
						</h2>
						<p className="text-gray-600 mb-2">
							{product.description}
						</p>{" "}
						{/* Menampilkan deskripsi produk */}
						<p className="text-gray-600 mb-1">
							<span className="font-medium">
								Kategori:
							</span>{" "}
							{product.category}
						</p>{" "}
						{/* Menampilkan kategori produk */}
						<p className="text-gray-600 mb-1">
							<span className="font-medium">Harga:</span> $
							{product.price.toFixed(2)}
						</p>{" "}
						{/* Menampilkan harga produk */}
						<p className="text-gray-600">
							<span className="font-medium">
								Ketersediaan:
							</span>{" "}
							{product.availability}
						</p>{" "}
						{/* Menampilkan ketersediaan produk */}
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
