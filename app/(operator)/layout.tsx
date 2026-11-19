import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Tambahkan 'async' pada function di atas
  // 2. Tambahkan 'await' sebelum cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get('operator_token');

  // Jika tidak ada token, tendang kembali ke halaman login
  if (!token) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 
        Nanti di sini Anda bisa menaruh Sidebar khusus Operator.
        Contoh: <SidebarOperator />
      */}
      
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}