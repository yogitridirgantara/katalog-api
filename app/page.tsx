export default function Home() {
	return (
		<section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-10 text-center">
				<header className="mb-6">
					<h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4 animate-fade-in">
						Yogi Tri Dirgantara
					</h1>
					<p className="text-lg sm:text-xl text-gray-700 animate-fade-in delay-200">
						Web Developer · Graphic Designer · UI/UX
						Enthusiast
					</p>
				</header>
				<p className="text-gray-600 text-md sm:text-lg mb-6 animate-fade-in delay-300">
					Menggabungkan kreativitas visual dan teknologi untuk
					menciptakan solusi digital yang fungsional dan estetis.
				</p>
				<div className="flex justify-center space-x-4 animate-fade-in delay-500">
					<a
						href="#contact"
						className="px-6 py-2 rounded-full border border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition duration-300"
					>
						Hubungi Saya
					</a>
				</div>
			</div>
		</section>
	);
}
