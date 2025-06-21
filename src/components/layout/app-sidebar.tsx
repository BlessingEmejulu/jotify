"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, FileText, PlusSquare, Settings, Search, Folder } from 'lucide-react';
import { PATHS } from '@/lib/constants';
import { JotifyLogo } from '../icons/logo';
import { Input } from '../ui/input';

// Mock data for recent notes
const recentNotes = [
  { id: '1', title: 'Lecture on Quantum Physics', href: PATHS.NOTE('1') },
  { id: '2', title: 'Calculus Midterm Review', href: PATHS.NOTE('2') },
  { id: '3', title: 'History of Ancient Rome', href: PATHS.NOTE('3') },
];

export function AppSidebar() {
  const pathname = usePathname();

  const mainNavItems = [
    { href: PATHS.NEW_NOTE, label: 'New Note', icon: PlusSquare },
    { href: PATHS.DASHBOARD, label: 'Dashboard', icon: Home },
    // Add more items as needed
  ];
  
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-sidebar text-sidebar-foreground fixed h-full">
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="grid items-start gap-2">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="w-full rounded-lg bg-background pl-8 h-9"
            />
          </div>
          {mainNavItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-6">
            <h3 className="px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Recent Notes</h3>
            <nav className="grid items-start gap-1">
                {recentNotes.map(note => (
                    <Link key={note.id} href={note.href}>
                        <Button 
                            variant={pathname === note.href ? 'secondary' : 'ghost'} 
                            className={cn(
                                "w-full justify-start text-sm h-8",
                                pathname === note.href ? "font-medium" : "font-normal text-muted-foreground"
                            )}
                            title={note.title}
                        >
                           <FileText className="mr-2 h-4 w-4 flex-shrink-0" /> 
                           <span className="truncate">{note.title}</span>
                        </Button>
                    </Link>
                ))}
            </nav>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
