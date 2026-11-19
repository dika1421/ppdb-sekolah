import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Background Gambar Sekolah */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Image dengan Efek Transparan & Animasi */}
        <div className="absolute inset-0 z-0 animate-[zoomIn_20s_ease-in-out_infinite_alternate]">
          {/* Ganti '/sekolah.jpg' dengan nama file gambar Anda di folder public */}
          <Image
            src="/sekolah.jpg" 
            alt="Gedung Sekolah"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          {/* Overlay Gradient agar teks lebih mudah dibaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/95"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Kiri: Teks & Tombol dengan Animasi Slide Up */}
          <div className="flex-1 text-center lg:text-left animate-[fadeInUp_1s_ease-out_forwards]">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm bg-opacity-80">
              🎓 Pendaftaran Telah Dibuka
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
              Bergabunglah Bersama <br className="hidden lg:block" />
              <span className="text-blue-600">PPDB Sekolah Kami</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 font-medium">
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
                className="bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors text-center shadow-sm"
              >
                Pelajari Visi & Misi
              </Link>
            </div>
          </div>

          {/* Kanan: Logo Sekolah dengan Animasi Floating */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md relative animate-[float_6s_ease-in-out_infinite]">
            <div className="relative bg-white/50 backdrop-blur-md p-8 rounded-full shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center">
              {/* Ganti '/logo.png' dengan nama file logo Anda di folder public */}
              <Image 
                src="/logo.png" 
                alt="Logo SMKSDU" 
                width={300} 
                height={300} 
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur / Keunggulan Section */}
      <section className="bg-gray-50 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-gray-600">Fasilitas terbaik dan lingkungan belajar yang nyaman.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kurikulum Modern</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Pembelajaran yang aktif, inovatif, dan menyenangkan untuk mengembangkan potensi siswa secara maksimal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏫
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fasilitas Lengkap</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ruang kelas ber-AC, laboratorium komputer, perpustakaan luas, dan area ekstrakurikuler yang memadai.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}