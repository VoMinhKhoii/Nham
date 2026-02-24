import { MainSidebar } from '@/components/app/main-sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#FEFBF6]">
      <div className="mx-3 my-3 flex flex-1 gap-3">
        <MainSidebar />
        {children}
      </div>
    </div>
  );
}
