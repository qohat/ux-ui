import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { Sidebar } from '@/components/layout/Sidebar';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader user={session.user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
