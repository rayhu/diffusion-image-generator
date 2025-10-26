import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stable Diffusion Generator',
  description: 'Generate images using Stable Diffusion AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Stable Diffusion Generator
                </h1>
                <nav className="flex space-x-4">
                  <a href="/" className="text-gray-600 hover:text-gray-900">
                    Generate
                  </a>
                  <a
                    href="/gallery"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Gallery
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
