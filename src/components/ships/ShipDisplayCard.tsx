import Image from 'next/image';
// Removed Link import as it wasn't used in the final version
import './ShipDisplayCard.css'; // Import the CSS file
import type { CombinedShipData } from '@/app/map/page'; // Import the combined type

// Define props for the component using the combined ship data type
interface ShipCardProps {
  ship: CombinedShipData;
}

// Default image if API image fails or doesn't exist
const DEFAULT_SHIP_IMAGE = '/images/default-ship.png'; // Adjust path if needed

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
    // Add Bootstrap 'card' and 'h-100' for consistent height in rows
    // Keep 'ship-card' for custom styles
    <div className="card ship-card h-100">
        <div className="image-container"> {/* Keep custom container for background/padding */}
          <Image
            src={imageUrl}
            className="card-img-top ship-image" // Use card-img-top for positioning, keep ship-image for custom styles
            alt={`Bilde av ${ship.shipName || 'skip'}`}
            width={250} // Keep dimensions or adjust as needed
            height={200}
            onError={handleImageError}
            unoptimized={true}
          />
        </div>
        {/* Use Bootstrap card-body */}
        <div className="card-body ship-info"> {/* Keep ship-info for custom text styles */}
          {/* Use Bootstrap card-title */}
          <h5 className="card-title ship-name">{ship.shipName || `MMSI: ${ship.mmsi}`}</h5>
          {/* Use Bootstrap card-text for details */}
          <p className="card-text ship-detail">Type: {ship.vesselType || 'N/A'}</p>
          <p className="card-text ship-detail">Call Sign: {ship.callSign || 'N/A'}</p>
        </div>
    </div>
  );
}