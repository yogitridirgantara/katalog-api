// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Student = {
	id: string;
	nim: string;
	nama: string;
	kelas: string;
	points: string;
};

const studentsData = {
	status: "success",
	data: [
		{
			id: "1319",
			nim: "-",
			nama: "DEDEN YUDHA PRANAJAYA",
			kelas: "S1-SI-A-P-SM5-20241",
			points: "1706844",
		},
		{
			id: "1508",
			nim: "-",
			nama: "SAHNA PUTRI YUNINDRA",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "3381662",
		},
		{
			id: "1525",
			nim: "-",
			nama: "OKTA ADITYA PRATAMA ",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "2904797",
		},
		{
			id: "1436",
			nim: "-",
			nama: "RIVALDY AHMAD MAULANA",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "2683302",
		},
		{
			id: "1513",
			nim: "-",
			nama: "RASAIL IKHWANUS S",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "1543007",
		},
		{
			id: "1534",
			nim: "-",
			nama: "ZAKIYAAULIAA",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "1731395",
		},
		{
			id: "1536",
			nim: "-",
			nama: "RIFKI FAUZI",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "1175416",
		},
		{
			id: "1324",
			nim: "-",
			nama: "DAFFA FAUZUL HAKIM",
			kelas: "S1-SI-A-P-SM5-20241",
			points: "2326024",
		},
		{
			id: "1454",
			nim: "-",
			nama: "MUHAMAD RIZKI ARDIANSYAH",
			kelas: "S1-SI-B-P-SM5-20241",
			points: "1690733",
		},
		{
			id: "1331",
			nim: "-",
			nama: "FIKRY AIMAN MUNADHIL",
			kelas: "S1-SI-A-P-SM5-20241",
			points: "2619102",
		},
	],
};

const HomePage = () => {
	const students: Student[] = studentsData.data;

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
				Daftar Mahasiswa
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{students.map((student) => (
					<div
						key={student.id}
						data-aos="fade-up"
						className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
					>
						<h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
							{student.nama}
						</h2>
						<p className="text-gray-600 mb-1">
							<span className="font-medium">Kelas:</span>{" "}
							{student.kelas}
						</p>
						<p className="text-gray-600">
							<span className="font-medium">Poin:</span>{" "}
							{Number(student.points).toLocaleString()}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
