"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "operator_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  // Daftar menu sidebar
  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Visi & Misi", path: "/dashboard/visi-misi", icon: "📝" },
    { name: "Galeri", path: "/dashboard/galeri", icon: "🖼️" },
  ];

  // Jangan tampilkan sidebar di halaman login
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        {/* Logo / Brand */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200">
          <Link href="/dashboard" className="text-xl font-bold text-blue-700">
            PPDB Operator
          </Link>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menus.map((menu) => {
            const isActive = pathname === menu.path;
            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{menu.icon}</span>
                {menu.name}
              </Link>
            );
          })}
        </nav>

        {/* Tombol Logout di Bawah */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar (Opsional untuk mobile) */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <span className="font-bold text-blue-700">PPDB Operator</span>
          <button onClick={handleLogout} className="text-red-600 text-sm font-medium">Logout</button>
        </div>
        
        {/* Render halaman di sini */}
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}