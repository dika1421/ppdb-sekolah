import Navbar from "../components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      
      {/* BACKGROUND GLOBAL (Menempel di layar) */}
      <div className="fixed inset-0 z-0 animate-[zoomIn_20s_ease-in-out_infinite_alternate]">
        <img
          src="/gedung-sekolah.jpg" 
          alt="Gedung Sekolah"
          className="w-full h-full object-cover object-center opacity-30"
        />
        {/* Overlay putih agar teks di atasnya tetap terbaca jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/95"></div>
      </div>

      {/* KONTEN (Navbar dan Halaman) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </div>
      
    </div>
  );
}