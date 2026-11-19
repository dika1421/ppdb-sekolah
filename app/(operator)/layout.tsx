import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Komponen internal yang menangani verifikasi login
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
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <Suspense fallback={<div>Memuat...</div>}>
          <AuthCheck>{children}</AuthCheck>
        </Suspense>
      </main>
    </div>
  );
}