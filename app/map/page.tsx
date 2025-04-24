'use client'
import dynamic from 'next/dynamic'
import { useMemo, useState, useEffect } from 'react'
import type { ais, ship } from '@/src/types/shipdata'; // Import your types

// Define a combined type for convenience
export type CombinedShipData = ais & Omit<ship, 'mmsi'>;

export default function MapPage() {
  const [shipData, setShipData] = useState<CombinedShipData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useMemo to ensure the component is only created once client-side
  const FleetMap = useMemo(() => dynamic(
    () => import('@/src/components/map/FleetMapComponent'),
    {
      loading: () => <p>Loading map component...</p>,
      ssr: false 
    }
  ), []) 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
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
          shipDetailsMap.set(mmsi, details);
        });

        // Combine AIS data with ship details
        const combinedData = aisData
          .map(aisRecord => {
            const details = shipDetailsMap.get(aisRecord.mmsi);
            if (details) {
              return { ...aisRecord, ...details };
            }
            return null;
          })
          .filter((item): item is CombinedShipData => item !== null); 

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
    return <p>Loading ship data...</p>; // Data loading indicator
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  // Pass the fetched and combined data to the map component
  return <FleetMap ships={shipData} />;
}
