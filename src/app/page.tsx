"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/lib/constants';
import { JotifyLogo } from '@/components/icons/logo';

// Mock authentication check
const checkAuthStatus = async (): Promise<boolean> => {
  // In a real app, this would check a token or session
  return Promise.resolve(false); // Default to not authenticated for now
};

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const determineRoute = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        router.replace(PATHS.NEW_NOTE);
      } else {
        router.replace(PATHS.LOGIN);
      }
    };

    determineRoute().catch(console.error);
    // Set loading to false after a short delay to allow redirect to happen,
    // or if you want to show a splash screen.
    // For this scaffold, we'll keep it simple.
    // If not redirecting, we can show a landing page instead of a spinner.
    // For now, always redirecting, so a spinner is fine.
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);

  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <JotifyLogo size={64} className="text-primary mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold text-primary mb-2 font-headline">Jotify</h1>
      <p className="text-lg text-foreground mb-8">Loading your notes...</p>
      {/* Simple spinner */}
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
