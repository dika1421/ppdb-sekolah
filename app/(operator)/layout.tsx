import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Tambahkan baris ini untuk memaksa render dinamis
export const dynamic = 'force-dynamic';

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('operator_token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}