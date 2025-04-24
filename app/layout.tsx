import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/src/components/footer/footer';
import Navbar from '@/src/components/navbar/Navbar';
import {
  FaNewspaper,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingBag,
} from 'react-icons/fa';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tall Ships Races 2025',
  description: 'Nettside for Tall Ships Races 2025',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'News', path: '/news', icon: <FaNewspaper /> },
    { name: 'Products', path: '/products', icon: <FaShoppingBag /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
              <Navbar
        logo={{
          src: '/logo.svg',
          alt: 'Tall Ships Races logo',
          width: 204,
          height: 81,
        }}
        brandName="Apinor"
        items={navItems}
        showCart={true}
        showBanner={true}
      />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
