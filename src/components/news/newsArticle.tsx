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

// Helper function to render text with **bold** syntax
function renderBoldText(text: string): React.ReactNode {
  // Split by the bold markers, keeping the delimiters
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    // If the part matches the bold syntax, render it as <strong>
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    // Otherwise, return the plain text part
    return part;
  });
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

  // Function to parse and render the article content
  const renderContent = () => {
    // Split content into lines and filter out empty lines
    const lines = Innhold.split('\n').filter(line => line.trim() !== '');
    const elements: React.ReactNode[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let listItems: React.ReactNode[] = [];

    // Helper to close any currently open list and add it to the elements array
    const closeCurrentList = () => {
      if (currentListType === 'ul') {
        elements.push(<ul key={`ul-${elements.length}`} className="article-list mb-3">{listItems}</ul>);
      } else if (currentListType === 'ol') {
        // Add specific class for medal list styling if needed
        elements.push(<ol key={`ol-${elements.length}`} className="article-list article-medal-list mb-3">{listItems}</ol>);
      }
      listItems = []; // Reset list items
      currentListType = null; // Reset list type
    };

    lines.forEach((line, index) => {
      const ulMatch = line.match(/^\s*-\s+(.*)/); // Match unordered list items (- item)
      const olMatch = line.match(/^\s*(\d+)\.\s*plass\s+(.*)/i); // Match ordered list items (X. plass item)

      if (ulMatch) {
        // Handle unordered list item
        if (currentListType !== 'ul') {
          closeCurrentList(); // Close previous list if different type
          currentListType = 'ul'; // Start a new ul
        }
        // Add list item, rendering bold text within it
        listItems.push(<li key={`li-${index}`}>{renderBoldText(ulMatch[1])}</li>);
      } else if (olMatch) {
        // Handle ordered list item (medals)
        if (currentListType !== 'ol') {
          closeCurrentList(); // Close previous list if different type
          currentListType = 'ol'; // Start a new ol
        }
        const place = parseInt(olMatch[1], 10);
        const text = olMatch[2];
        let medal = null;
        // Assign medal emoji based on place
        if (place === 1) medal = '🥇 ';
        else if (place === 2) medal = '🥈 ';
        else if (place === 3) medal = '🥉 ';
        // Add list item with medal (if any) and text (rendering bold)
        listItems.push(
          <li key={`li-${index}`}>
            {medal}
            {renderBoldText(text)}
          </li>
        );
      } else {
        // Handle regular paragraph
        closeCurrentList(); // Close any open list before adding a paragraph
        // Add paragraph, rendering bold text within it
        elements.push(<p key={`p-${index}`}>{renderBoldText(line)}</p>);
      }
    });

    // Close any list remaining after the loop finishes
    closeCurrentList();

    return elements; // Return the array of rendered JSX elements
  };


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
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
