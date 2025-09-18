'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface GoogleMapProps {
  className?: string;
}

// Skeleton loading component
function MapSkeleton() {
  return (
    <div className="h-64 bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center relative animate-pulse">
      <MapPinIcon className="w-16 h-16 text-white opacity-70" />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2">
        <div className="w-20 h-3 bg-gray-300 rounded mb-1"></div>
        <div className="w-24 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

// Custom marker component
function CustomMarker({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center"
    >
      <MapPinIcon className="w-4 h-4 text-white" />
    </div>
  );
}

export default function GoogleMap({ className }: GoogleMapProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // Institute for Advanced Studies location
  const instituteLocation = { lat: 42.4304, lng: 19.2594 }; // Podgorica, Montenegro coordinates

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch('/api/maps/key');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch API key');
        }

        setApiKey(data.apiKey);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load map');
      } finally {
        setLoading(false);
      }
    }

    fetchApiKey();
  }, []);

  if (loading) {
    return <MapSkeleton />;
  }

  if (error || !apiKey) {
    return (
      <div className="h-64 bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center relative">
        <div className="text-center text-white">
          <MapPinIcon className="w-16 h-16 mx-auto mb-2 opacity-70" />
          <p className="text-sm">Map unavailable</p>
          <p className="text-xs opacity-75">{error || 'Configuration error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={15}
          defaultCenter={instituteLocation}
          mapId="institute-map"
          className="w-full h-64 rounded-t-2xl"
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={true}
          styles={[
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              stylers: [{ visibility: 'off' }]
            }
          ]}
        >
          <AdvancedMarker
            position={instituteLocation}
            onClick={() => setShowInfoWindow(true)}
          >
            <CustomMarker onClick={() => setShowInfoWindow(true)} />
          </AdvancedMarker>

          {showInfoWindow && (
            <InfoWindow
              position={instituteLocation}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className="p-3 max-w-xs">
                <h3 className="font-bold text-gray-900 mb-2">Institute for Advanced Studies</h3>
                <p className="text-gray-600 text-sm mb-2">
                  University of Montenegro<br />
                  Mihaila Lalića bb<br />
                  81000 Podgorica, Montenegro
                </p>
                <div className="flex space-x-2">
                  <a
                    href="tel:+38220414255"
                    className="text-violet-600 hover:text-violet-800 text-xs"
                  >
                    +382 20 414 255
                  </a>
                  <span className="text-gray-400">•</span>
                  <a
                    href="mailto:ins@ucg.ac.me"
                    className="text-violet-600 hover:text-violet-800 text-xs"
                  >
                    ins@ucg.ac.me
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}