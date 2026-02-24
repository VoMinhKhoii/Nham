import { redirect } from 'next/navigation';
import { MainSidebar } from '@/components/app/main-sidebar';
import { createClient } from '@/lib/supabase/server';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-[#FEFBF6]">
      <div className="mx-3 my-3 flex flex-1 gap-3">
        <MainSidebar />
        {children}
      </div>
    </div>
  );
}
