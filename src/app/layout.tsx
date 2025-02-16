import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>mimir ai 🤖</title>
      </head>
      <body className="antialiased">
         <AuthProvider>
          {children}
           <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
