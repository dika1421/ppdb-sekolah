import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Baca cookie langsung di layout utama
  const cookieStore = await cookies();
  const token = cookieStore.get('operator_token');

  // Jika tidak ada token, langsung redirect
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