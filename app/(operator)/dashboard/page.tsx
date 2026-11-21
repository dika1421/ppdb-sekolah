import Link from "next/link";
import { revalidatePath } from "next/cache";
import pool from "../../lib/db"; // PATH SUDAH DIPERBAIKI SESUAI STRUKTUR FOLDER

// Server Action untuk hapus data
async function hapusPendaftar(formData: FormData) {
  "use server";
  const id = formData.get("id");
  if (!id) return;

  try {
    await pool.query("DELETE FROM pendaftar WHERE id = $1", [id]);
    revalidatePath("/dashboard"); // Refresh halaman setelah hapus
  } catch (error) {
    console.error("Gagal menghapus pendaftar:", error);
  }
}

export default async function DashboardPage() {
  let statsData = { total: 0, diterima: 0, pending: 0, ditolak: 0 };
  let pendaftarTerbaru: any[] = [];

  try {
    const statsQuery = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Diterima') as diterima,
        COUNT(*) FILTER (WHERE status = 'Pending') as pending,
        COUNT(*) FILTER (WHERE status = 'Ditolak') as ditolak
      FROM pendaftar
    `);
    
    const row = statsQuery.rows[0];
    statsData = {
      total: parseInt(row.total, 10),
      diterima: parseInt(row.diterima, 10),
      pending: parseInt(row.pending, 10),
      ditolak: parseInt(row.ditolak, 10),
    };

    const terbaruQuery = await pool.query('SELECT * FROM pendaftar ORDER BY id DESC LIMIT 5');
    pendaftarTerbaru = terbaruQuery.rows;

  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
  }

  const stats = [
    { title: "Total Pendaftar", value: statsData.total.toString(), icon: "👥", color: "bg-blue-500" },
    { title: "Diterima", value: statsData.diterima.toString(), icon: "✅", color: "bg-green-500" },
    { title: "Dalam Proses", value: statsData.pending.toString(), icon: "⏳", color: "bg-yellow-500" },
    { title: "Ditolak", value: statsData.ditolak.toString(), icon: "❌", color: "bg-red-500" },
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
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Grafik Pendaftar Mingguan</h2>
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 outline-none bg-gray-50">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          
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

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Pendaftar Terbaru</h2>
          <div className="space-y-6">
            {pendaftarTerbaru.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada pendaftar.</p>
            ) : (
              pendaftarTerbaru.map((user, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                    {user.nama.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{user.nama}</p>
                    <p className="text-xs text-gray-500">{user.asal_sekolah}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    user.status === 'Diterima' ? 'bg-green-50 text-green-600' : 
                    user.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))
            )}
          </div>
          <Link href="/dashboard/pendaftar" className="block text-center w-full mt-6 text-sm text-blue-600 font-semibold hover:underline">
            Lihat Semua Pendaftar
          </Link>
        </div>
      </div>

      {/* Tabel Data Pendaftar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">5 Pendaftar Terbaru</h2>
          <Link href="/dashboard/pendaftar" className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Kelola Data
          </Link>
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
              {pendaftarTerbaru.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">Belum ada data pendaftar.</td>
                </tr>
              ) : (
                pendaftarTerbaru.map((siswa) => (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{siswa.nama}</td>
                    <td className="py-4 px-6 text-gray-600">{siswa.asal_sekolah}</td>
                    <td className="py-4 px-6 text-gray-600">{siswa.no_wa}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        siswa.status === 'Diterima' ? 'bg-green-100 text-green-700' : 
                        siswa.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {siswa.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Link href="/dashboard/pendaftar" className="text-blue-600 hover:underline text-sm font-medium">
                          Detail
                        </Link>
                        
                        {/* TOMBOL HAPUS YANG ANDA MINTA */}
                        <form action={hapusPendaftar}>
                          <input type="hidden" name="id" value={siswa.id} />
                          <button
                            type="submit"
                            className="text-red-600 hover:text-red-800 hover:underline text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}