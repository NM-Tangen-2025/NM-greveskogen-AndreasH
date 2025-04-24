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
      // --- EDIT START ---
      // Construct the API URL for a single article and add ?populate=*
      // to include related fields like Bilde
      const apiUrl = `https://fortunate-bear-715099df12.strapiapp.com/api/Nyhetsartikler/${validId}?populate=*`;
      // --- EDIT END ---
      const apiKey = "1330d7d0a7e52fbcf4779861a6948373dff5f06b8bbce4cc0d08025276bb45ce3114590200d5b3cb7d0a856325f55c71e170fc2f2e4508102712e4730fbfb075c745056641f618bee2e54bf7ccdb1a56c6c4e89d60ef7c25f728198bde97d7e4cfbb773f63336580c64084350f57ffba8a15e289b1016cbe4df256bc2928bd50"; // Consider using environment variables

      if (!apiKey) {
        throw new Error("API key is not configured.");
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
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
        setArticle(responseData.data);
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
