'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface FooterProps {
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  companyName?: string;
  navigationLinks?: {
    title: string;
    links: { name: string; path: string }[];
  }[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  copyright?: string;
}

/**
 * Footer component for site footer, with responsive design.
 * Requires Bootstrap to be installed for proper styling.
 * 
 * This requires react-icons
 * 
 * **Usage example:**
 * 
 * ```typescript
 * import Footer from '@/src/components/layout/footer';
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <main>{children}</main>
 *       <Footer 
 *         logo={{
 *           src: '/images/logo.png',
 *           alt: 'Company Logo',
 *           width: 150,
 *           height: 50
 *         }}
 *         companyName="Company Name"
 *         navigationLinks={[
 *           {
 *             title: "Products",
 *             links: [
 *               { name: "Product 1", path: "/products/1" },
 *               { name: "Product 2", path: "/products/2" },
 *             ]
 *           },
 *           {
 *             title: "Company",
 *             links: [
 *               { name: "About Us", path: "/about" },
 *               { name: "Contact", path: "/contact" },
 *             ]
 *           }
 *         ]}
 *         contactInfo={{
 *           email: "info@example.com",
 *           phone: "+1 234 567 890",
 *           address: "123 Street, City, Country"
 *         }}
 *         socialLinks={{
 *           facebook: "https://facebook.com/example",
 *           twitter: "https://twitter.com/example",
 *           instagram: "https://instagram.com/example",
 *           linkedin: "https://linkedin.com/company/example"
 *         }}
 *         copyright="© 2023 Company Name. All rights reserved."
 *       />
 *     </>
 *   );
 * }
 * ```
 * 
 * All props are optional and have default values.
 * The component automatically handles mobile responsiveness.
 */
export default function Footer({
  logo = {
    src: '/logo.svg',
    alt: 'Logo',
    width: 150,
    height: 60,
  },
  companyName = 'Apinor',
  navigationLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'News', path: '/news' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Products',
      links: [
        { name: 'Featured', path: '/products/featured' },
        { name: 'New Arrivals', path: '/products/new' },
        { name: 'Best Sellers', path: '/products/best-sellers' },
        { name: 'Discounts', path: '/products/discounts' },
      ],
    },
  ],
  contactInfo = {
    email: 'Marianne.Osmundsen.Tronstad@kristiansand.kommune.no',
    phone: '+47 380 75 000',
    address: 'Kristiansand, Norge',
  },
  socialLinks = {
    facebook: 'https://www.facebook.com/thetallshipsraces/',
    twitter: 'https://x.com/TallShipsRaces',
    instagram: 'https://www.instagram.com/tallshipsraces/?hl=no',
    linkedin: 'https://www.linkedin.com/company/tall-ships-races-international-limited/?originalSubdomain=uk',
  },
  copyright = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="bg-light mt-5 pt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-muted mb-4">
              Providing quality products and services since 2010. We are committed to customer satisfaction and excellence in everything we do.
            </p>
            <div className="d-flex gap-3 mb-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary fs-5">
                  <FaFacebook />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-info fs-5">
                  <FaTwitter />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-danger fs-5">
                  <FaInstagram />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary fs-5">
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-6 mb-4">
              <h5 className="mb-3">{section.title}</h5>
              <ul className="list-unstyled">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <Link href={link.path} className="text-decoration-none text-muted hover-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              {contactInfo.email && (
                <li className="mb-2 d-flex align-items-center">
                  <FaEnvelope className="me-2 text-primary" />
                  <a href={`mailto:${contactInfo.email}`} className="text-decoration-none text-muted">
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="mb-2 d-flex align-items-center">
                  <FaPhone className="me-2 text-primary" />
                  <a href={`tel:${contactInfo.phone}`} className="text-decoration-none text-muted">
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="mb-2 d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <span className="text-muted">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">{copyright}</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-muted mb-0">
              <Link href="/privacy" className="text-decoration-none text-muted me-3">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-decoration-none text-muted">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-primary:hover {
          color: #0d6efd !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
}