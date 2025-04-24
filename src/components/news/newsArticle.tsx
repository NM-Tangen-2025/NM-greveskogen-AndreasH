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

interface NewsArticleProps {
  article: nyhetsartikler;
}

export default function NewsArticle({
  article /*, relatedArticles = [] */,
}: NewsArticleProps) {
  // Destructure directly from article, assuming no 'attributes' nesting based on your type
  const { Tittel, Ingress, Innhold, Dato, Bilde /*, author */ } = article;

  // Format the published date using Dato field
  const timeAgo = formatDistanceToNow(new Date(Dato), {
    addSuffix: true,
    locale: nb,
  });

  const formattedDate = format(new Date(Dato), 'd. MMMM yyyy', {
    locale: nb,
  });

  const originalImageUrl =
    Bilde?.formats?.medium?.url || // Prefer medium
    Bilde?.formats?.small?.url || // Fallback small
    Bilde?.formats?.thumbnail?.url; // Fallback thumbnail (or Bilde?.url if original is stored there)

    console.log("originalImageUrl: ",  Bilde); // Debugging line

  // Construct the URL for the Next.js image proxy route using ternary operator
  // Only use the proxy if an original URL exists, otherwise use placeholder
  const imageUrl = originalImageUrl
    ? `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}`
    : null; // Set to null if no original image URL is found
  // --- EDIT END ---

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
            <div className="me-3">{formattedDate}</div>
            <div className="me-3">{timeAgo}</div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="position-relative featured-image-container">
            <Image
              src={imageUrl} // Use the corrected proxy URL or placeholder
              alt={imageAlt}
              className="featured-image rounded"
              width={1200} // Adjust dimensions as needed
              height={675}
              layout="responsive" // Makes image scale with container
              objectFit="cover" // Cover the area
              priority // Prioritize loading for main image
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
