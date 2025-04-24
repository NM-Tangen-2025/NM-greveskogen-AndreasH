'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaShoppingCart,
  FaNewspaper,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';
import styles from './Navbar.module.css';

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  brandName?: string;
  items: NavItem[];
  showCart?: boolean;
  showBanner?: boolean;
  bannerImage?: string;
}
/**
 * Navbar component for site navigation, with responsive design and scroll effects.
 * Requires Bootstrap to be installed for proper styling.
 * 
 * This requres react-icons
 * 
 * **Usage example:**
 * 
 * ```typescript
* import Navbar from '@/src/components/layout/Navbar';
* import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
* 
* export default function Layout({ children }) {
*   const navItems = [
*     { name: 'Home', path: '/', icon: <FaHome /> },
*     { name: 'About', path: '/about', icon: <FaInfoCircle /> },
*     { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
*   ];
*   
*   return (
*     <>
*       <Navbar 
*         logo={{
*           src: '/images/logo.png',
*           alt: 'Company Logo',
*           width: 150,
*           height: 50
*         }}
*         brandName="Company Name"
*         items={navItems}
*         showCart={true}
*         showBanner={true}
*         bannerImage="/images/banner.jpg"
*       />
*       <main>{children}</main>
*     </>
*   );
* }
* ```
* 
* All props except 'items' are optional and have default values.
* The component automatically handles mobile responsiveness and scroll effects.
*/
export default function Navbar({
  logo = {
    src: '/logo.svg',
    alt: 'Logo',
    width: 204,
    height: 81,
  },
  brandName,
  items = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'News', path: '/news', icon: <FaNewspaper /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ],
  showCart = true,
  showBanner = true,
  bannerImage = '/images/ApinorBanner.jpg',
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.navbarContainer}>
      <div
        className={`navbar-main ${isScrolled ? 'navbar-scrolled' : ''}`}
        style={{
          width: '100%',
          backgroundColor: isScrolled ? 'white' : 'transparent',
          position: isScrolled ? 'fixed' : 'relative',
          top: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
          <nav className="navbar navbar-expand-lg navbar-light py-2">
            <div className="container-fluid d-flex align-items-center position-relative">
              <Link href="/" className="navbar-brand d-flex align-items-center">
                <div
                  className={styles.logoContainer}
                  style={{ height: logo.height, width: logo.width }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                {/* {brandName && <span className="ms-2 fw-bold">{brandName}</span>} */}
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-controls="navbarNav"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`collapse navbar-collapse justify-content-end ${
                  isMenuOpen ? 'show' : ''
                }`}
                id="navbarNav"
                style={{
                  position: isMenuOpen ? 'absolute' : 'static',
                  top: isMenuOpen ? '100%' : 'auto',
                  left: isMenuOpen ? '0' : 'auto',
                  width: isMenuOpen ? '100%' : 'auto',
                  zIndex: 1000,
                }}
              >
                <ul className="navbar-nav align-items-center bg-white shadow-sm rounded p-2">
                  {items.map((item, index) => (
                    <li key={index} className="nav-item">
                      <Link
                        href={item.path}
                        className={`nav-link px-3 py-2 d-flex align-items-center ${
                          pathname === item.path ? 'active fw-bold' : ''
                        }`}
                      >
                        {item.icon && <span className="me-2">{item.icon}</span>}
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {/* {showCart && (
                    <li className="nav-item ms-lg-2">
                      <Link 
                        href="/cart" 
                        className={`nav-link cart-icon px-3 py-2 d-flex align-items-center ${pathname === '/cart' ? 'active' : ''}`}
                      >
                        <FaShoppingCart size={20} />
                        <span className="ms-2 d-lg-none">Cart</span>
                      </Link>
                    </li>
                  )} */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* {showBanner && (
        <div className="banner-container" style={{ marginTop: isScrolled ? '76px' : '0' }}>
          <Image
            src={bannerImage}
            alt="Banner"
            className="img-fluid w-100"
            width={1300}
            height={139}
            priority
          />
        </div>
      )} */}

      <style jsx global>{`
        .navbar-scrolled {
          padding: 0.5rem 0;
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #0d6efd;
        }

        .nav-link:hover {
          color: #0d6efd !important;
        }

        .cart-icon {
          position: relative;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background-color: white;
            padding: 0;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-top: 0;
          }

          .nav-link {
            padding: 0.75rem 1rem !important;
            border-bottom: 1px solid #f0f0f0;
          }

          .nav-item:last-child .nav-link {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  );
}
