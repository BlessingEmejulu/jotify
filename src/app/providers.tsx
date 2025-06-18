"use client";

import React from 'react';

// This component can be used to wrap your application with client-side providers
// such as theme providers, authentication context, etc.
export function Providers({ children }: { children: React.ReactNode }) {
  // Example: You might wrap with a ThemeProvider or AuthProvider here
  // For now, it just returns children.
  return <>{children}</>;
}
