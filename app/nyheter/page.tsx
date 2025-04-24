'use client';
import NewsCard from '@/src/components/news/newsCard';
// Import useState and useEffect for state management and side effects
import { useEffect, useState } from 'react'

// Define the interface for a single news article, matching NewsCard's expected prop
import type nyhetsartikler from '@/src/types/nyhetsartikler';

export default function Page() {
  // State to hold the array of news articles
  const [newsArticles, setNewsArticles] = useState<nyhetsartikler[]>([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to hold potential errors
  const [error, setError] = useState<string | null>(null);

  async function GetNews() {
    setIsLoading(true);
    setError(null);
    try {
      const tempAPI = await fetch(`/api/news/`);

      if (!tempAPI.ok) {

        throw new Error(`Failed to fetch news: ${tempAPI.statusText} (${tempAPI.status})`);
      }

      const responseData = await tempAPI.json();

    //   console.log('Responsedata from nyhetsapi: ', responseData);

      // Check if the expected data structure exists
      if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {

        setNewsArticles(responseData.data.data);
      } else {
        // Handle unexpected data structure
        console.error('Unexpected data structure received:', responseData);
        setNewsArticles([]);
        setError('Could not parse news data.');
      }
    } catch (err) {
      // Handle network errors or errors thrown above
      console.error('Error while fetching news:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setNewsArticles([]);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect hook to call GetNews when the component mounts
  useEffect(() => {
    GetNews();
  }, []); // Empty dependency array means this runs once on mount

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <p>Laster nyheter...</p>
        {/* Optional: Add a spinner */}
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h1>Feil</h1>
        <p>Kunne ikke laste nyheter: {error}</p>
      </div>
    );
  }

  // Render the news articles using the NewsCard component
  return (
    <div className="container mt-5 mb-5"> {/* Use Bootstrap container for padding and centering */}
      <h1 className="text-center mb-4">Nyheter</h1>
      {newsArticles.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* Bootstrap grid */}
          {newsArticles.map((article) => (
            // Apply column classes here, outside the NewsCard component
            <div key={article.id} className="col">
              {/* Pass the individual article data to the NewsCard */}
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        // Render message if no articles are found (and not loading/error)
        <p className="text-center">Ingen nyhetsartikler funnet.</p>
      )}
    </div>
  );
}