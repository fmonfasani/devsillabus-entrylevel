// app/admin/layout.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/login');
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
