"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JotifyLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings, UserCircle, PlusCircle, Menu } from 'lucide-react';
import { PATHS } from '@/lib/constants';
import { useSidebar } from '@/components/ui/sidebar'; // Assuming sidebar has a context hook

export function AppHeader() {
  const router = useRouter();
  // const { toggleSidebar, isMobile } = useSidebar(); // Assuming sidebar hook from shadcn SidebarProvider
  // Mocking these values if useSidebar context is not fully set up in this step.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const toggleSidebar = () => console.log("Toggle sidebar clicked");


  const handleLogout = () => {
    // Mock logout
    console.log("User logged out");
    router.push(PATHS.LOGIN);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {isMobile && (
             <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
               <Menu className="h-6 w-6" />
               <span className="sr-only">Toggle Menu</span>
             </Button>
           )}
          <Link href={PATHS.DASHBOARD} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <JotifyLogo size={28} />
            <span className="text-xl font-bold font-headline hidden sm:inline-block">Jotify</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => router.push(PATHS.NEW_NOTE)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Note
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Student User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    student@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(PATHS.DASHBOARD)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
