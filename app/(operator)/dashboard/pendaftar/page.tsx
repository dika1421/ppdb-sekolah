import pool from '../../../lib/db';
import StatusDropdown from '../../../components/StatusDropdown';

export default async function DataPendaftarPage() {
  let pendaftar: any[] = [];
  let errorMsg = "";  

  try {
    const result = await pool.query('SELECT * FROM pendaftar ORDER BY id DESC');
    pendaftar = result.rows;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    errorMsg = "Terjadi kesalahan saat mengambil data dari database.";
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Data Pendaftar PPDB</h1>
          <p className="text-gray-500 mt-1">Kelola dan verifikasi berkas pendaftaran siswa baru.</p>
        </div>
      </div>

      {/* Pesan Error */}
      {errorMsg && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 text-sm">
                <th className="py-4 px-6 font-semibold">No</th>
                <th className="py-4 px-6 font-semibold">Nama Siswa</th>
                <th className="py-4 px-6 font-semibold">Asal Sekolah</th>
                <th className="py-4 px-6 font-semibold">No. WhatsApp</th>
                <th className="py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendaftar.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Belum ada data pendaftar.
                  </td>
                </tr>
              ) : (
                pendaftar.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{siswa.nama}</td>
                    <td className="py-4 px-6 text-gray-600">{siswa.asal_sekolah}</td>
                    <td className="py-4 px-6 text-gray-600">{siswa.no_wa}</td>
                    <td className="py-4 px-6">
                      
                      {/* GUNAKAN KOMPONEN KLIEN YANG BARU KITA BUAT */}
                      <StatusDropdown id={siswa.id} currentStatus={siswa.status} />

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