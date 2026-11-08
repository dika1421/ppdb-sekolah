"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("operator_token");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <div className="text-gray-500">Memeriksa akses...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Judul Halaman */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, Admin PPDB</h1>
        <p className="text-gray-500 mt-1">Pantau data pendaftar dan kelola website dari menu sebelah kiri.</p>
      </div>

      {/* Tabel Data Pendaftar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4">Data Pendaftar (Contoh)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="pb-3 px-2">Nama Siswa</th>
                <th className="pb-3 px-2">Asal Sekolah</th>
                <th className="pb-3 px-2">WhatsApp</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">Budi Santoso</td>
                <td className="py-3 px-2">SDN 01</td>
                <td className="py-3 px-2">08123456789</td>
                <td className="py-3 px-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Diterima</span></td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">Siti Aminah</td>
                <td className="py-3 px-2">SDN 02</td>
                <td className="py-3 px-2">08987654321</td>
                <td className="py-3 px-2"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}