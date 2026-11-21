import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Komponen terpisah untuk mengecek cookie
async function AuthCheck({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('operator_token');

  if (!token) {
    redirect('/login');
  }

  return <>{children}</>;
}

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      
      {/* NAVBAR / SIDEBAR OPERATOR */}
      <aside className="w-full md:w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <span className="text-3xl">🎓</span> Panel Operator
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="block px-4 py-3 bg-blue-800 rounded-xl font-medium transition-colors">
            📊 Dashboard
          </Link>
          <Link href="/dashboard/pendaftar" className="block px-4 py-3 hover:bg-blue-600 rounded-xl transition-colors">
            👥 Data Pendaftar
          </Link>
          <Link href="/dashboard/galeri" className="block px-4 py-3 hover:bg-blue-600 rounded-xl transition-colors">
            🖼️ Kelola Galeri
          </Link>
          <Link href="/dashboard/visi-misi" className="block px-4 py-3 hover:bg-blue-600 rounded-xl transition-colors">
            📝 Visi & Misi
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-600">
          <form action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.delete("operator_token");
            redirect("/login");
          }}>
            <button type="submit" className="w-full text-left px-4 py-2 hover:bg-red-500 bg-red-600/50 rounded-xl transition-colors font-medium">
              🚪 Logout
            </button>
          </form>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-6 md:p-10">
        <Suspense fallback={<div className="p-6 text-gray-500">Memeriksa sesi login...</div>}>
          <AuthCheck>{children}</AuthCheck>
        </Suspense>
      </main>
      
    </div>
  );
}