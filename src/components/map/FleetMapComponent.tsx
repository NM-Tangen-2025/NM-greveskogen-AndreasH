// src/components/map/FleetMapComponent.tsx
'use client' // Keep 'use client' here as it uses client-side libraries

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import type { CombinedShipData } from '@/app/map/page'; // Import the combined type
import Image from 'next/image'; // Import the Next.js Image component

// Define props for the component
interface FleetMapProps {
  ships: CombinedShipData[];
}

// Accept props
export default function FleetMapComponent({ ships }: FleetMapProps) {
  // Default center and zoom, adjust as needed
  const defaultCenter: LatLngExpression = [59.91, 10.75];
  const defaultZoom = 16; 

  // Calculate center based on ships if available, otherwise use default
  const mapCenter = ships.length > 0
    ? [
        ships.reduce((sum, ship) => sum + ship.latitude, 0) / ships.length,
        ships.reduce((sum, ship) => sum + ship.longitude, 0) / ships.length,
      ] as LatLngExpression
    : defaultCenter;

  return (
    <MapContainer
      center={mapCenter} // Use calculated or default center
      zoom={defaultZoom} // Use default zoom
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={true} // Enabled scroll wheel zoom
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {ships.map((ship) => (
        <Marker key={ship.mmsi} position={[ship.latitude, ship.longitude]}>
          <Popup>
            <div style={{ width: '150px', height: 'auto', marginBottom: '5px' }}> 
              <Image
                src={`https://api.skolenm.tanvgs.no/ships/${ship.mmsi}/image`}
                alt={`Image of ${ship.shipName || 'ship'}`}
                width={150} 
                height={100}
                style={{ display: 'block', height: 'auto', width: '100%' }} 
                unoptimized 
              />
            </div>
            <b>{ship.shipName}</b><br />
            Type: {ship.vesselType || 'N/A'}<br />
            Call Sign: {ship.callSign || 'N/A'}<br />
            Course: {ship.course}°<br />
            Time: {new Date(ship.msgtime).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}