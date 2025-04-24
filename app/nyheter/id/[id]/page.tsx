'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// Use react-bootstrap components if Bootstrap is set up globally
import { Container, Spinner, Alert } from 'react-bootstrap';
// Import the updated NewsArticle component and its interface
import NewsArticle from '@/src/components/news/newsArticle';
import nyhetsartikler from '@/src/types/nyhetsartikler';
import Link from 'next/link';

// Remove the old mock data and interface
// interface newsData { ... }
// const newsItems = [ ... ];

export default function Page() {
  // State for the fetched article, loading status, and errors
  const [article, setArticle] = useState<nyhetsartikler | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get the ID from the URL parameters
  const params = useParams();
  const id = params?.id; // ID will be a string or string[]

  // Function to fetch a single article by ID
  async function fetchArticleById(articleId: string | string[]) {
    // Ensure ID is a single string
    const validId = Array.isArray(articleId) ? articleId[0] : articleId;
    if (!validId) {
        setError("Invalid article ID.");
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching article with ID:', validId);
      const apiUrl = `/api/news/id/${validId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Article with ID ${validId} not found.`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // Strapi returns single items nested under 'data'
      if (responseData && responseData.data) {
        setArticle(responseData.data.data);
      } else {
        throw new Error("Invalid data structure received from API.");
      }

    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setArticle(null); // Clear article on error
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect hook to fetch data when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchArticleById(id);
    } else {
      // Handle case where ID might be missing initially
      setIsLoading(false);
      setError("Article ID is missing.");
    }
  }, [id]); // Re-run effect if the id changes

  // Render loading state
  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Article</Alert.Heading>
          <p>{error}</p>
          <Link href="/nyheter" className="btn btn-primary">Back to News</Link>
        </Alert>
      </Container>
    );
  }

  // Render the article if successfully fetched
  if (article) {
    // Pass the fetched article data to the NewsArticle component
    return <NewsArticle article={article} />;
  }

  // Fallback if no article, no error, and not loading (should ideally not be reached if error handling is correct)
  return (
      <Container className="mt-5 text-center">
          <p>Article could not be loaded.</p>
          <Link href="/nyheter" className="btn btn-primary">Back to News</Link>
      </Container>
  );
}
