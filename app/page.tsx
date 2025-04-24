// src/app/page.tsx (or wherever your Home component lives)
'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';
import type { ais, ship } from '@/src/types/shipdata';
import TeaserCard from '@/src/components/map/TeaserCard';
import Link from 'next/link';
import Image from 'next/image'; // Import the next/image component

export type CombinedShipData = ais & Omit<ship, 'mmsi'>;

export default function Home() {
  const [shipData, setShipData] = useState<CombinedShipData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FleetMap = useMemo(
    () =>
      dynamic(() => import('@/src/components/map/FleetMapComponent'), {
        loading: () => <p>Loading map component...</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [aisResponse, shipsResponse] = await Promise.all([
          fetch('https://api.skolenm.tanvgs.no/ais/'),
          fetch('https://api.skolenm.tanvgs.no/ships/'),
        ]);
        if (!aisResponse.ok || !shipsResponse.ok) {
          throw new Error('Failed to fetch ship data');
        }
        const aisData: ais[] = await aisResponse.json();
        const shipsDetailsData: ship[] = await shipsResponse.json();

        const shipDetailsMap = new Map<number, Omit<ship, 'mmsi'>>();
        shipsDetailsData.forEach(({ mmsi, ...details }) => {
          shipDetailsMap.set(mmsi, details);
        });

        const combinedData = aisData
          .map((aisRecord) => {
            const details = shipDetailsMap.get(aisRecord.mmsi);
            return details ? { ...aisRecord, ...details } : null;
          })
          .filter((item): item is CombinedShipData => item !== null);

        setShipData(combinedData);
      } catch (err) {
        console.error('Error fetching ship data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading ship data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <main>
      {/* Hero Section - Updated with Image Background */}
      {/* Removed bg-primary, added inline style for background image */}
      <div
        className="container-fluid text-white text-center p-5 mb-4 position-relative"
        style={{
          backgroundImage: `url('/image3.jpg')`, // Use image3 as background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px', // Adjust height as needed
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Added overlay for text readability */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Semi-transparent black overlay
        ></div>
        {/* Content needs to be relative to be above the overlay */}
        <div className="position-relative">
          <h1 className="display-4 fw-bold">Tall Ships Races Kristiansand 2025</h1>
          <p className="lead">
            Opplev den storslåtte finalen av The Tall Ships Races! <br />
            Kristiansand Havn | 30. juli – 2. august 2025
          </p>
          <p>Gratis folkefest for hele familien!</p>
          <Link href="/om" className="btn btn-light btn-lg mt-3">
            Lær Mer Om Arrangementet
          </Link>
        </div>
      </div>

      <div className="container">
        {/* Introduction - Remains the same */}
        <div className="row mb-5 text-center">
          <div className="col">
            <h2>Velkommen til Sørlandets Seilfest!</h2>
            <p className="lead">
              Kristiansand er stolt vertskap for den avsluttende etappen av The
              Tall Ships Races 2025. For første gang på 10 år fylles havna vår
              med majestetiske seilskip fra hele verden. Bli med på en
              uforglemmelig feiring med åpne skip, konserter, familieaktiviteter
              og maritim stemning!
            </p>
          </div>
        </div>

        {/* Teaser Section using TeaserCard */}
        <div className="row g-4 mb-5">
          <TeaserCard
            title="Siste Nytt"
            text="Hold deg oppdatert på de siste nyhetene og kunngjøringene rundt arrangementet."
            imageSrc="/people.jpg"
            alt="Folkemengde under Tall Ships Races"
            href="/nyheter"
            buttonLabel="Les Nyheter"
          />
          <TeaserCard
            title="Møt Flåten"
            text="Se hvilke imponerende seilskip som besøker Kristiansand, fra store Class A-skip til mindre fartøy."
            imageSrc="/image1.jpg"
            alt="Seilskip under Tall Ships Races"
            href="/skip"
            buttonLabel="Se Skipene"
          />
          <TeaserCard
            title="Fullt Program"
            text="Oppdag et spennende program med konserter, parader, aktiviteter for barn og muligheter for omvisning om bord."
            imageSrc="/image2.jpeg"
            alt="Aktiviteter under Tall Ships Races"
            href="/program"
            buttonLabel="Se Programmet"
          />
        </div>

        {/* More Info Callout - Remains the same */}
        <div className="row mb-5 text-center">
          <div className="col">
            <h3>Vil du vite mer?</h3>
            <p>
              Utforsk detaljert informasjon om arrangementets historie,
              praktiske detaljer, Cruise-in-Company og mye mer på vår Om-side.
            </p>
            <Link href="/om" className="btn btn-secondary">
              Finn mer informasjon her!
            </Link>
          </div>
        </div>

        <div className="row mb-5 text-center">
          <div className="col">
            <h3>Se hvor skipene er:</h3>
          </div>
        </div>

        {/* Fleet Map */}
        <div className="row">
          <div className="col">
            <FleetMap ships={shipData} />
          </div>
        </div>
      </div>
    </main>
  );
}
