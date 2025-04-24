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
  // Destructure from article.data, not directly from article
  const { Tittel, Ingress, Innhold, Dato, Bilde /*, author */ } = article;

  console.log('Article data:', article); // Debugging line

  // Use the destructured Dato directly
  console.log("Dato: ", Dato)

  // Format the published date using the destructured Dato
  const timeAgo = formatDistanceToNow(new Date(Dato), {
    addSuffix: true,
    locale: nb,
  });

  const formattedDate = format(new Date(Dato), 'd. MMMM yyyy', {
    locale: nb,
  });

  // Use the destructured Bilde directly
  const originalImageUrl =
    Bilde?.formats?.medium?.url ||
    Bilde?.formats?.small?.url ||
    Bilde?.formats?.thumbnail?.url;


  // Construct the URL for the Next.js image proxy route using ternary operator
  const imageUrl = originalImageUrl
    ? `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}`
    : '/images/placeholder.jpg';

  // Use the destructured Tittel directly
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
          {/* Use the destructured Tittel directly */}
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
              src={imageUrl}
              alt={imageAlt}
              className="featured-image rounded"
              width={1200}
              height={675}
              layout="responsive"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Article Ingress (summary) */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="article-description p-3 bg-light rounded">
            {/* Use the destructured Ingress directly */}
            <p className="lead mb-0">{Ingress}</p>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="article-content">
            {Innhold.split('\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
