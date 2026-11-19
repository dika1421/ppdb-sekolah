import Link from 'next/link';

export default function DataPendaftarPage() {
  const pendaftar = [
    { id: 1, nama: "Budi Santoso", asalSekolah: "SDN 01", wa: "08123456789", status: "Diterima" },
    { id: 2, nama: "Siti Aminah", asalSekolah: "SDN 02", wa: "08987654321", status: "Pending" },
    { id: 3, nama: "Andi Wijaya", asalSekolah: "SDN 05", wa: "08112233445", status: "Diterima" },
    { id: 4, nama: "Rina Melati", asalSekolah: "SDN 03", wa: "08556677888", status: "Ditolak" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Data Pendaftar PPDB</h1>
          <p className="text-gray-500 mt-1">Kelola dan verifikasi berkas pendaftaran siswa baru.</p>
        </div>
      </div>

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
              {pendaftar.map((siswa, index) => (
                <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{siswa.nama}</td>
                  <td className="py-4 px-6 text-gray-600">{siswa.asalSekolah}</td>
                  <td className="py-4 px-6 text-gray-600">{siswa.wa}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      siswa.status === 'Diterima' ? 'bg-green-100 text-green-700' : 
                      siswa.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {siswa.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}