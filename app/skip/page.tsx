'use client' // Make it a client component for data fetching

import { useState, useEffect } from 'react';
import type { ais, ship } from '@/src/types/shipdata';
import type { CombinedShipData } from '@/app/map/page'; // Reuse the type from map page
import ShipDisplayCard from '@/src/components/ships/ShipDisplayCard'; // Import the refactored card

export default function SkipPage() { // Renamed function for clarity
    const [shipData, setShipData] = useState<CombinedShipData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch data from both endpoints concurrently
                const [aisResponse, shipsResponse] = await Promise.all([
                    fetch('https://api.skolenm.tanvgs.no/ais/'),
                    fetch('https://api.skolenm.tanvgs.no/ships/')
                ]);

                if (!aisResponse.ok || !shipsResponse.ok) {
                    throw new Error('Failed to fetch ship data');
                }

                const aisData: ais[] = await aisResponse.json();
                const shipsDetailsData: ship[] = await shipsResponse.json();

                // Create a map for quick lookup of ship details by mmsi
                const shipDetailsMap = new Map<number, Omit<ship, 'mmsi'>>();
                shipsDetailsData.forEach(({ mmsi, ...details }) => {
                    // Ensure shipName is used if present in details
                    shipDetailsMap.set(mmsi, details);
                });

                // Combine AIS data with ship details
                const combinedData = aisData
                    .map(aisRecord => {
                        const details = shipDetailsMap.get(aisRecord.mmsi);
                        if (details) {
                            // Combine, ensuring properties from 'details' (like shipName) are included
                            return { ...aisRecord, ...details };
                        }
                        // Optionally include ships even if only AIS data is available
                        // return { ...aisRecord, shipName: `MMSI: ${aisRecord.mmsi}`, vesselType: 'N/A', callSign: 'N/A' };
                        return null; // Or filter out ships without details
                    })
                    .filter((item): item is CombinedShipData => item !== null); // Filter out nulls and assert type

                setShipData(combinedData);
            } catch (err) {
                console.error("Error fetching ship data:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    if (isLoading) {
        return (
            // Use Bootstrap classes for centering and styling
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
                <h1 className="h3 mb-3 fw-bold">Alle Skip</h1>
                <p className="lead text-muted">Laster skipsdata...</p>
                {/* Optional: Add a Bootstrap spinner here */}
                {/* <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> */}
            </div>
        );
    }

    if (error) {
        return (
            // Use Bootstrap classes for centering and styling error message
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
                 <h1 className="h3 mb-3 fw-bold text-danger">Feil</h1>
                <p className="lead text-danger">Kunne ikke laste skipsdata: {error}</p>
            </div>
        );
    }

    return (
        // Use Bootstrap container and padding utilities
        <div className="container py-4 py-md-5">
            {/* Center title */}
            <h1 className="h1 mb-4 mb-md-5 text-center fw-bold">Alle Skip</h1>
            {shipData.length === 0 ? (
                 <p className="lead text-center text-muted">Ingen skip funnet.</p>
            ) : (
                 // Use Bootstrap row and column classes for the grid
                 // Adjust col-* classes for desired responsiveness (1 to 5 columns)
                 <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {shipData.map((ship) => (
                        // Each card is placed in a Bootstrap column
                        <div key={ship.mmsi} className="col d-flex align-items-stretch">
                            <ShipDisplayCard ship={ship} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}