"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Tambahkan import Link

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Cek apakah cookie operator_token ada
    const isLoggedIn = document.cookie.includes("operator_token");
    if (!isLoggedIn) {
      router.push("/login"); // Tendang ke login jika belum masuk
    } else {
      setIsChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Hapus cookie
    document.cookie = "operator_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Memeriksa akses...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Operator</h1>
            <p className="text-gray-500 text-sm mt-1">Selamat datang, Admin PPDB.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Menu Pengaturan Konten Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/visi-misi" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
            <h3 className="font-bold text-lg text-blue-700 group-hover:text-blue-800">Edit Visi & Misi</h3>
            <p className="text-sm text-gray-500 mt-1">Ubah teks visi dan misi sekolah yang tampil di halaman publik.</p>
          </Link>
          
          <Link href="/dashboard/galeri" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
            <h3 className="font-bold text-lg text-blue-700 group-hover:text-blue-800">Kelola Galeri</h3>
            <p className="text-sm text-gray-500 mt-1">Tambah atau hapus daftar foto galeri sekolah.</p>
          </Link>
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
    </div>
  );
}