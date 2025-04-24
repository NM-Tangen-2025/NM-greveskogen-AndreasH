// src/components/map/FleetMapComponent.tsx
'use client' // Keep 'use client' here as it uses client-side libraries

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

type Ship = { id: string; pos: LatLngExpression }

const ships: Ship[] = [
  { id: 'AURORA',  pos: [59.92, 10.76] },
  { id: 'POLARIS', pos: [59.915, 10.80] },
  { id: 'ORION',   pos: [59.90, 10.72] },
]

export default function FleetMapComponent() { // Renamed component
  return (
    <MapContainer
      center={[59.91, 10.75]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={false} // Consider setting to true for better usability
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {ships.map(({ id, pos }) => (
        <Marker key={id} position={pos}>
          <Popup>{id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}