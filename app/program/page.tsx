'use client'
import { useEffect, useState } from "react";
import type { arrangementer } from "@/src/types/arrangementer";
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import Image from 'next/image'; // Import Next.js Image component

export default function Page() {
  const [events, setEvents] = useState<arrangementer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const tempAPI = await fetch(`/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await tempAPI.json();
      console.log('Response data from events API:', responseData);

      if (tempAPI.ok) {
        // Ensure the response data is an array before setting state
        if (Array.isArray(responseData.data)) {
          // Sort events by Tidspunkt (time)
          const sortedEvents = responseData.data.sort((a: arrangementer, b: arrangementer) =>
            new Date(a.Tidspunkt).getTime() - new Date(b.Tidspunkt).getTime()
          );
          setEvents(sortedEvents); // Set the fetched events into state
        } else {
          console.error('Expected data to be an array, but received:', responseData.data);
          setError('Uventet dataformat mottatt fra serveren.');
          setEvents([]); // Set to empty array in case of wrong format
        }
      } else {
        // Handle non-OK responses
        setError(responseData.message || `Feil: ${tempAPI.status}`);
        setEvents([]);
      }
    } catch (error) {
      console.error('Error while fetching URL', error);
      setError('Kunne ikke hente programdata. Prøv igjen senere.');
      setEvents([]); // Clear events on error
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Helper function to format time
  const formatTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), 'HH:mm', { locale: nb });
    } catch (e) {
      console.error("Error formatting time:", e);
      return "Ugyldig tid";
    }
  };

  // Helper function to format date
  const formatDate = (dateTimeString: string) => {
     try {
      // Capitalize the first letter of the day name
      const formatted = format(new Date(dateTimeString), 'EEEE d. MMMM', { locale: nb });
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Ugyldig dato";
    }
  }

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = formatDate(event.Tidspunkt);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, arrangementer[]>);


  return (
    // Use Bootstrap container for layout
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-5 text-center">Program</h1>

      {/* Loading state */}
      {loading && <p className="text-center">Laster program...</p>}

      {/* Error state */}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

      {/* No events found state */}
      {!loading && !error && Object.keys(groupedEvents).length === 0 && (
        <p className="text-center text-muted">Ingen programposter funnet.</p>
      )}

      {/* Display events */}
      {!loading && !error && Object.keys(groupedEvents).length > 0 && (
        <div className="timeline">
          {Object.entries(groupedEvents).map(([date, dayEvents]) => (
            <div key={date} className="mb-5">
              {/* Date Header */}
              <h2 className="h4 fw-semibold mb-4 text-center sticky-top bg-light py-2 border-bottom">{date}</h2>
              {/* Events for the day */}
              <div className="row g-4 justify-content-center">
                {dayEvents.map((event) => {
                  // Construct image URL using the proxy
                  const originalImageUrl =
                    event.Bilde?.formats?.medium?.url ||
                    event.Bilde?.formats?.small?.url ||
                    event.Bilde?.formats?.thumbnail?.url;

                  const imageUrl = originalImageUrl
                    ? `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}`
                    : '/images/placeholder.jpg'; // Fallback placeholder

                  const imageAlt = event.Bilde?.alternativeText || `Bilde for ${event.Tittel}`;

                  return (
                    // Use Bootstrap grid columns for layout
                    <div key={event.id} className="col-md-8 col-lg-6">
                      {/* Use Bootstrap card component */}
                      <div className="card h-100 shadow-sm program-card">
                        <div className="row g-0">
                          {/* Image Column (Optional) */}
                          {originalImageUrl && (
                            <div className="col-sm-4">
                              <div className="position-relative h-100" style={{ minHeight: '150px' }}>
                                <Image
                                  src={imageUrl}
                                  alt={imageAlt}
                                  layout="fill" // Use fill layout
                                  objectFit="cover" // Cover the container
                                  className="rounded-start" // Bootstrap class for rounded corners
                                />
                              </div>
                            </div>
                          )}
                          {/* Content Column */}
                          <div className={originalImageUrl ? "col-sm-8" : "col-12"}>
                            <div className="card-body d-flex flex-column h-100">
                              <h5 className="card-title h6 fw-bold text-primary mb-1">
                                <span className="fw-bolder">{formatTime(event.Tidspunkt)}</span> - {event.Tittel}
                              </h5>
                              {event.Lokasjon?.Navn && (
                                <p className="card-subtitle mb-2 text-muted small">
                                  {/* Simple location icon (using text or an SVG if preferred) */}
                                  📍 {event.Lokasjon.Navn}
                                </p>
                              )}
                              <p className="card-text small flex-grow-1">{event.Ingress}</p>
                              {/* Optional: Add link or button if needed */}
                              {/* <a href="#" className="btn btn-sm btn-outline-primary mt-auto">Les mer</a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
