import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Nama Sekolah */}
        <Link href="/" className="text-xl font-bold text-blue-700">
          PPDB Sekolah
        </Link>

        {/* Menu Navigasi */}
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <Link href="/visi-misi" className="hover:text-blue-600 transition-colors">
            Visi & Misi
          </Link>
          <Link href="/galeri" className="hover:text-blue-600 transition-colors">
            Galeri
          </Link>
          <Link href="/daftar" className="text-blue-600 hover:text-blue-800 font-semibold">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}