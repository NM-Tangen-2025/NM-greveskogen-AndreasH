'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MapPage() {
  // Use useMemo to ensure the component is only created once client-side
  const FleetMap = useMemo(() => dynamic(
    () => import('@/src/components/map/FleetMapComponent'), // Adjust path if needed
    {
      loading: () => <p>Loading map...</p>, // Optional loading indicator
      ssr: false // Disable server-side rendering for this component
    }
  ), []) // Empty dependency array ensures this runs once on mount

  return <FleetMap />
}
