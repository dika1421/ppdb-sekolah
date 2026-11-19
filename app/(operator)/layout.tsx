import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Komponen terpisah untuk mengecek cookie
async function AuthCheck({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('operator_token');

  if (!token) {
    redirect('/login');
  }

  return <>{children}</>;
}

// Layout utama
export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        {/* Bungkus dengan Suspense agar tidak error saat prerender */}
        <Suspense fallback={<div className="p-6">Memeriksa sesi login...</div>}>
          <AuthCheck>{children}</AuthCheck>
        </Suspense>
      </main>
    </div>
  );
}