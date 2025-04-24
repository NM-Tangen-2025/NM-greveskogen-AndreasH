import Image from 'next/image';
// Removed Link import as it wasn't used in the final version
import './ShipDisplayCard.css'; 
import type { CombinedShipData } from '@/app/map/page'; 
// Define props for the component using the combined ship data type
interface ShipCardProps {
  ship: CombinedShipData;
}

// Default image if API image fails or doesn't exist
const DEFAULT_SHIP_IMAGE = '/images/default-ship.png'; 

export default function ShipDisplayCard({ ship }: ShipCardProps) {
  const imageUrl = `https://api.skolenm.tanvgs.no/ships/${ship.mmsi}/image`;

  // Basic error handling for the image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Prevent infinite loop if default image also fails
    if (target.src !== DEFAULT_SHIP_IMAGE) {
        console.warn(`Failed to load image for MMSI ${ship.mmsi}, using default.`);
        target.src = DEFAULT_SHIP_IMAGE;
    }
  };

  return (
    <div className="card ship-card h-100">
        <div className="image-container"> 
          <Image
            src={imageUrl}
            className="card-img-top ship-image" 
            alt={`Bilde av ${ship.shipName || 'skip'}`}
            width={250} 
            height={200}
            onError={handleImageError}
            unoptimized={true}
          />
        </div>
        <div className="card-body ship-info"> 
          <h5 className="card-title ship-name">{ship.shipName || `MMSI: ${ship.mmsi}`}</h5>
          <p className="card-text ship-detail">Type: {ship.vesselType || 'N/A'}</p>
          <p className="card-text ship-detail">Call Sign: {ship.callSign || 'N/A'}</p>
        </div>
    </div>
  );
}