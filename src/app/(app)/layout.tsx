import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar'; // Using ShadCN SidebarProvider

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // It's important to use SidebarProvider if AppHeader or other components
    // depend on its context (e.g., for mobile toggle).
    // For this scaffold, AppSidebar is standalone for desktop,
    // and AppHeader has a mock mobile toggle.
    // If a real mobile sidebar is needed, SidebarProvider should wrap this.
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar /> {/* Visible on md+ screens */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 bg-background overflow-auto"> 
          {/* md:ml-64 accounts for fixed sidebar width */}
          {children}
        </main>
      </div>
    </div>
  );
}
