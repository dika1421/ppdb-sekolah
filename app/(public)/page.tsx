import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Kiri: Teks & Tombol */}
          <div className="flex-1 text-center lg:text-left animate-[fadeInUp_1s_ease-out_forwards]">
            
            {/* Badge Label */}
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-800/80 border border-slate-600 text-slate-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Pendaftaran Tahun Ajaran 2026/2027 Telah Dibuka
            </span>

            {/* Judul Utama */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
              Bergabunglah <br />
              <span className="text-green-400">Bersama Kami</span> <br />
              <span className="text-blue-400">SMKS Darul Ulum</span>
            </h1>

            {/* Deskripsi */}
            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Cetak generasi berkarakter, berprestasi, dan berwawasan global. 
              Daftarkan putra-putri Anda sekarang untuk menjadi bagian dari keluarga besar SMK Darul Ulum Bojongsari Depok.
            </p>

            {/* Tombol */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/daftar"
                className="bg-green-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/40 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>→</span> Daftar Sekarang
              </Link>
            </div>
          </div>

          {/* Kanan: Gambar Brosur */}
          <div className="flex-1 w-full max-w-md lg:max-w-xl relative animate-[float_6s_ease-in-out_infinite] mb-10 lg:mb-0">
            <div className="relative bg-white p-2 sm:p-3 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex items-center justify-center">
              {/* GANTI GAMBAR DI SINI */}
              <img 
                src="/brosur_ppdb.jpg" 
                alt="Brosur PPDB SMKSDU" 
                className="object-contain w-full h-auto rounded-xl"
              />
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