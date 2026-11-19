import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Kiri: Teks & Tombol */}
          <div className="flex-1 text-center lg:text-left animate-[fadeInUp_1s_ease-out_forwards]">
            
            {/* Badge Label */}
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-800/80 border border-slate-600 text-slate-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Solusi Manajemen Sekolah Modern
            </span>

            {/* Judul Utama */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
              Kelola Sekolah <br />
              <span className="text-green-400">Lebih Mudah &</span> <br />
              <span className="text-blue-400">Terintegrasi</span>
            </h1>

            {/* Deskripsi */}
            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              SIMDU adalah platform manajemen sekolah berbasis web yang menghubungkan semua elemen sekolah — siswa, guru, staf, dan orang tua — dalam satu ekosistem digital yang efisien dan transparan.
            </p>

            {/* Tombol */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/login"
                className="bg-green-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>→</span> Login Sekarang
              </Link>
              <Link
                href="#fitur"
                className="bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-2"
              >
                <span>▶</span> Lihat Fitur
              </Link>
            </div>
          </div>

          {/* Kanan: Logo di dalam Kotak Putih */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md relative animate-[float_6s_ease-in-out_infinite] mb-10 lg:mb-0">
            <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex items-center justify-center aspect-square lg:w-[450px] lg:h-[450px]">
              <img 
                src="/logo_smk.jpg" 
                alt="Logo SMKSDU" 
                className="object-contain w-full h-full rounded-xl"
              />
            </div>
            
            {/* Badge Tambahan di Bawah (Opsional, seperti di referensi) */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-[fadeInUp_1.5s_ease-out_forwards]">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                👥
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">1.200+ Pengguna</p>
                <p className="text-xs text-gray-500">Aktif setiap hari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur / Keunggulan Section */}
      <section id="fitur" className="bg-slate-900/80 backdrop-blur-md py-20 relative z-10 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-slate-400">Fasilitas terbaik dan lingkungan belajar yang nyaman.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl shadow-sm border border-slate-700 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kurikulum Modern</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Pembelajaran yang aktif, inovatif, dan menyenangkan untuk mengembangkan potensi siswa secara maksimal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl shadow-sm border border-slate-700 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏫
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fasilitas Lengkap</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Ruang kelas ber-AC, laboratorium komputer, perpustakaan luas, dan area ekstrakurikuler yang memadai.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl shadow-sm border border-slate-700 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prestasi Gemilang</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Bimbingan intensif untuk meraih prestasi di bidang akademik maupun non-akademik tingkat nasional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animasi Keyframes khusus untuk Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
}