import Link from 'next/link';

export default function DetailPendaftarPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/dashboard/pendaftar" className="text-gray-500 hover:text-blue-600 font-medium">
          ← Kembali ke Daftar
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Detail Pendaftar #{params.id}</h1>
        <p className="text-gray-500 mb-6">Berikut adalah data lengkap pendaftar PPDB.</p>
        
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-600">Halaman detail ini masih berupa template. Nanti, Anda bisa mengambil data dari database PostgreSQL berdasarkan ID <strong>{params.id}</strong>.</p>
        </div>
      </div>
    </div>
  );
}