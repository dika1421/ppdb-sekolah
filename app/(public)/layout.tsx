import Navbar from "../components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-900">
      
      {/* BACKGROUND GLOBAL */}
      <div className="fixed inset-0 z-0">
        <img
          src="/gedung-sekolah.jpg" 
          alt="Gedung Sekolah"
          className="w-full h-full object-cover object-center opacity-50"
        />
        {/* Overlay Gelap (Dark Blue/Black) agar teks putih menyala */}
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
      </div>

      {/* KONTEN */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </div>
      
    </div>
  );
}