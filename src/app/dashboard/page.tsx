'use client';
import { Header } from "@/views/header/Header";
import { usePathname } from "next/navigation";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.split('/')[2] || 'mystery-box';

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} />
      <main>{children}</main>
    </div>
  );
}