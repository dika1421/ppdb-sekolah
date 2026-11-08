import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Tampilan Modern */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-28 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Kiri: Teks & Tombol */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            🎓 Pendaftaran Telah Dibuka
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Bergabunglah Bersama <br className="hidden lg:block" />
            <span className="text-blue-600">PPDB Sekolah Kami</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Cetak generasi berkarakter, berprestasi, dan berwawasan global. 
            Daftarkan putra-putri Anda untuk tahun ajaran 2026/2027 sekarang.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/daftar"
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 text-center"
            >
              Mulai Pendaftaran
            </Link>
            <Link
              href="/visi-misi"
              className="bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Pelajari Visi & Misi
            </Link>
          </div>
        </div>

        {/* Kanan: Gambar Ilustrasi/Placeholder Modern */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
          <div className="relative bg-gray-200 h-80 md:h-96 rounded-3xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
             <span className="text-gray-400 font-medium">[ Ilustrasi / Foto Sekolah ]</span>
          </div>
        </div>
      </section>

      {/* Fitur / Keunggulan Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-gray-600">Fasilitas terbaik dan lingkungan belajar yang nyaman.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kurikulum Modern</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Pembelajaran yang aktif, inovatif, dan menyenangkan untuk mengembangkan potensi siswa secara maksimal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏫
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fasilitas Lengkap</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ruang kelas ber-AC, laboratorium komputer, perpustakaan luas, dan area ekstrakurikuler yang memadai.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏆
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prestasi Gemilang</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Bimbingan intensif untuk meraih prestasi di bidang akademik maupun non-akademik tingkat nasional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}