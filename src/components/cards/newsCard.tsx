import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import './newsCard.css';

// Define an interface matching the structure from your Strapi API
import type nyhetsartikler from '@/src/types/nyhetsartikler';

// Update the component props to use the new interface
export default function NewsCard({ article }: { article: nyhetsartikler }) {
  // Simple date formatting
  const formattedDate = new Date(article.Dato).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

    const timeAgo = formatDistanceToNow(new Date(article.Dato), {
    addSuffix: true,
    locale: nb,
  });

  const placeholderImage = '/placeholder-image.jpg'; 

  return (

    <div className="card news-card h-100 shadow-sm">
      <img
        src={placeholderImage}
        className="card-img-top"
        alt={`Bilde for ${article.Tittel}`}
        style={{ objectFit: 'cover', height: '200px', width: '100%' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.Tittel}</h5>
        <p className="card-text text-truncate-3 flex-grow-1">{article.Ingress}</p>
        <p className="card-text">
          <small className="text-muted">Publisert for {timeAgo} siden den {formattedDate}</small>
        </p>
        <Link
          href={`/nyheter/${article.id}`}
          className="btn btn-outline-primary mt-auto align-self-start"
        >
          Les mer
        </Link>
      </div>
    </div>
  );
}
