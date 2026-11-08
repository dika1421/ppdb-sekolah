"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  // Data dummy untuk statistik
  const stats = [
    { title: "Total Pendaftar", value: "124", icon: "👥", color: "bg-blue-500" },
    { title: "Diterima", value: "85", icon: "✅", color: "bg-green-500" },
    { title: "Dalam Proses", value: "32", icon: "⏳", color: "bg-yellow-500" },
    { title: "Ditolak", value: "7", icon: "❌", color: "bg-red-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Halaman */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ikhtisar Dashboard</h1>
          <p className="text-gray-500 mt-1">Pantau statistik pendaftaran dan kelola konten sekolah.</p>
        </div>
        <Link 
          href="/" 
          target="_blank"
          className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 text-sm"
        >
          🌐 Lihat Halaman Publik
        </Link>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Area Grafik & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Grafik Pendaftaran (Simulasi visual) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Grafik Pendaftar Mingguan</h2>
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 outline-none bg-gray-50">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          
          {/* Visualisasi Bar Chart Sederhana */}
          <div className="h-64 flex items-end gap-2 sm:gap-4 mt-8">
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-blue-50 rounded-t-lg relative flex-1 flex items-end">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600" 
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 font-medium">Hari {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Pendaftar Terbaru</h2>
          <div className="space-y-6">
            {[
              { name: "Budi Santoso", time: "2 menit lalu", status: "Baru" },
              { name: "Siti Aminah", time: "1 jam lalu", status: "Verifikasi" },
              { name: "Andi Wijaya", time: "3 jam lalu", status: "Baru" },
              { name: "Rina Melati", time: "5 jam lalu", status: "Selesai" },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  user.status === 'Baru' ? 'bg-blue-50 text-blue-600' : 
                  user.status === 'Verifikasi' ? 'bg-yellow-50 text-yellow-600' : 
                  'bg-green-50 text-green-600'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-sm text-blue-600 font-semibold hover:underline">Lihat Semua Pendaftar</button>
        </div>
      </div>

      {/* Tabel Data Pendaftar (Detail) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Tabel Pendaftar PPDB</h2>
          <button className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Export Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 text-sm">
                <th className="py-4 px-6 font-semibold">Nama Siswa</th>
                <th className="py-4 px-6 font-semibold">Asal Sekolah</th>
                <th className="py-4 px-6 font-semibold">WhatsApp</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Budi Santoso</td>
                <td className="py-4 px-6 text-gray-600">SDN 01</td>
                <td className="py-4 px-6 text-gray-600">08123456789</td>
                <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Diterima</span></td>
                <td className="py-4 px-6 text-center"><button className="text-blue-600 hover:underline text-sm font-medium">Detail</button></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Siti Aminah</td>
                <td className="py-4 px-6 text-gray-600">SDN 02</td>
                <td className="py-4 px-6 text-gray-600">08987654321</td>
                <td className="py-4 px-6"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pending</span></td>
                <td className="py-4 px-6 text-center"><button className="text-blue-600 hover:underline text-sm font-medium">Detail</button></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Andi Wijaya</td>
                <td className="py-4 px-6 text-gray-600">SDN 05</td>
                <td className="py-4 px-6 text-gray-600">08112233445</td>
                <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Diterima</span></td>
                <td className="py-4 px-6 text-center"><button className="text-blue-600 hover:underline text-sm font-medium">Detail</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}