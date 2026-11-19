import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-transparent"> 
      {/* Hero Section - Background diambil dari layout.tsx */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* HAPUS BAGIAN INI DARI page.tsx */}
        {/* <div className="absolute inset-0 z-0 ..."> ... </div> */}

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Kiri: Teks & Tombol dengan Animasi Slide Up */}
          <div className="flex-1 text-center lg:text-left animate-[fadeInUp_1s_ease-out_forwards]">
             {/* ... (Sisa teks hero tetap sama) ... */}
             <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm bg-opacity-80">
              🎓 Pendaftaran Telah Dibuka
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
              Bergabunglah Bersama <br className="hidden lg:block" />
              <span className="text-blue-600">SMK Darul Ulum</span>
            </h1>
            {/* ... (Sisa teks & tombol) ... */}
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
          <div className="flex-1 w-full max-w-xs sm:max-w-sm lg:max-w-md relative animate-[float_6s_ease-in-out_infinite] mb-10 lg:mb-0">
            <div className="relative bg-white/80 backdrop-blur-md p-4 rounded-full shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center aspect-square">
              <img 
                src="/logo_smk.jpg" 
                alt="Logo SMKSDU" 
                className="object-contain w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur / Keunggulan Section (Biarkan sama) */}
      <section className="bg-white/80 backdrop-blur-sm py-20 relative z-10"> 
      {/* ^ Note: Saya ubah bg-gray-50 jadi bg-white/80 backdrop-blur-sm agar kotaknya agak transparan menampilkan background gedung */}
        
        <div className="max-w-6xl mx-auto px-6">
          {/* ... (Sisa konten keunggulan tetap sama) ... */}
        </div>
      </section>

      {/* Animasi Keyframes khusus untuk Tailwind (Biarkan sama) */}
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