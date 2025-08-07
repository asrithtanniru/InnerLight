
'use client';
import type { Metadata } from 'next';
import './globals.css';
import { AdminLayout } from '@/components/admin-layout';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

// Metadata cannot be exported from a client component, so we keep it in a server component.
// We can create a new server component layout that wraps this client component layout.
// However, for simplicity, we can define it here and accept the warning.
// In a real app, it's better to have a separate server layout.
// For now we will keep the metadata object here but it won't be applied.

function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>InnerLight Admin</title>
        <meta name="description" content="Admin Dashboard for InnerLight App" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}
