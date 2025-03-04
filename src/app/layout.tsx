import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Marketing Resources",
  description: "Access premium digital marketing resources and PDFs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script to set theme based on localStorage or system preference before page renders */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Try to get user's preference from localStorage
                const savedTheme = localStorage.getItem('theme');
                
                // Always default to light theme unless explicitly set to dark
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.style.backgroundColor = '#000000';
                } else {
                  // Explicitly set to light mode to override any browser defaults
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                  document.documentElement.style.backgroundColor = '#ffffff';
                  
                  // If no preference is saved, explicitly save 'light'
                  if (!savedTheme) {
                    localStorage.setItem('theme', 'light');
                  }
                }
                
                // Add debugging info to console
                console.log('Initial theme setup:', savedTheme || 'light (default)');
              } catch (e) {
                console.error('Error setting initial theme:', e);
              }
            })();
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Providers>
          <Navbar />
          <div className="flex-grow bg-background">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
