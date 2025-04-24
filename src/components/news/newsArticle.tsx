import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import './newsArticle.css';
// Import Markdown renderer if you want to render Markdown content
// import ReactMarkdown from 'react-markdown';

// Import the type definition
import type nyhetsartikler from '@/src/types/nyhetsartikler';

// Remove the inline StrapiNewsArticle interface definition
/*
export interface StrapiNewsArticle {
  id: number;
  attributes: {
    Tittel: string;
    Ingress: string;
    Innhold: string; // Assuming this is the main content field
    Dato: string;
    // Optional: Add author if available in your Strapi model
    // author?: string;
    Bilde?: {
      data?: {
        attributes?: {
          url: string;
          formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
          };
        };
      };
    };
    // Add other fields from your Strapi model if needed
  };
}
*/

// Update the props interface to use the imported type
interface NewsArticleProps {
  article: nyhetsartikler; // Use the imported type here
  // Keep relatedArticles if you plan to fetch/pass them, otherwise remove
  // relatedArticles?: nyhetsartikler[]; // Also update type here if used
}

export default function NewsArticle({ article /*, relatedArticles = [] */ }: NewsArticleProps) {
  // Destructure attributes for easier access
  // This assumes the 'nyhetsartikler' type has an 'attributes' property
  // with Tittel, Ingress, Innhold, Dato, and Bilde inside.
const { Tittel, Ingress, Innhold, Dato, Bilde /*, author */ } = article;

  // Format the published date using Dato field
  const timeAgo = formatDistanceToNow(new Date(Dato), {
    addSuffix: true,
    locale: nb,
  });

  const formattedDate = format(new Date(Dato), 'd. MMMM yyyy', { 
    locale: nb,
  });

  const imageUrl =
    Bilde?.formats?.medium?.url ||
    Bilde?.formats?.small?.url || 
    Bilde?.formats.thumbnail?.url ||
    '/placeholder-image.jpg'; 

  const imageAlt = `Bilde for ${Tittel}`;

  return (
    <div className="container py-4 news-article">
      {/* Back button (optional) */}
      <div className="mb-4">
        <Link href="/nyheter" className="btn btn-outline-secondary">
          {/* <i className="bi bi-arrow-left me-2"></i> Optional icon */}
          Tilbake til Nyheter
        </Link>
      </div>

      {/* Article header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="article-title">{Tittel}</h1>
          <div className="d-flex flex-wrap align-items-center text-muted mb-3">
            <div className="me-3">
              {formattedDate}
            </div>
            <div className="me-3">
              {timeAgo}
            </div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="position-relative featured-image-container">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="featured-image rounded"
              width={1200} // Adjust dimensions as needed
              height={675}
              layout="responsive" // Makes image scale with container
              objectFit="cover" // Cover the area
              priority // Prioritize loading for main image
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
              }}
            />
          </div>
        </div>
      </div>

      {/* Article Ingress (summary) */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="article-description p-3 bg-light rounded">
            <p className="lead mb-0">{Ingress}</p>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="row mb-5">
        <div className="col-lg-12"> 
          <div className="article-content">
            {Innhold.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}