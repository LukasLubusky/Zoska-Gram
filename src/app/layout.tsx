// src\app\layout.tsx

import { Metadata } from "next";
import "./globals.css";
import BottomNavbar from "@/components/NavBar";
import AuthProvider from "@/components/AuthProvider";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by me L. Lubusky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
            <BottomNavbar />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

