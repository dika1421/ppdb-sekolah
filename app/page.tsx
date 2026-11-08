import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-blue-700">
          Selamat Datang di PPDB Sekolah Kami
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Pendaftaran peserta didik baru tahun ajaran 2026/2027 telah dibuka.
        </p>
        <Link
          href="/daftar"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Daftar Sekarang
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20 grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg">Syarat Pendaftaran</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Fotokopi ijazah, kartu keluarga, dan pas foto terbaru.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg">Jadwal</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Gelombang 1: 1–30 Juni 2026. Gelombang 2: 1–15 Juli 2026.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg">Kontak</h2>
          <p className="text-gray-600 mt-2 text-sm">
            WhatsApp: 08xx-xxxx-xxxx
          </p>
        </div>
      </section>
    </main>
  );
}