import { JotifyLogo } from '@/components/icons/logo';
import Link from 'next/link';
import { PATHS } from '@/lib/constants';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 sm:p-6 lg:p-8">
      <div className="absolute top-6 left-6">
        <Link href={PATHS.HOME} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <JotifyLogo size={32} />
          <span className="text-2xl font-bold font-headline">Jotify</span>
        </Link>
      </div>
      <main className="w-full max-w-md">
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Jotify. All rights reserved.
      </footer>
    </div>
  );
}
