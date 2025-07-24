import React from 'react';
import { MapPin } from 'lucide-react';

interface DomainLocation {
  domain: string;
  city: string;
  regionName: string;
  country: string;
  lat: number;
  lon: number;
}

interface DomainMapProps {
  locations: DomainLocation[];
}

export const DomainMap: React.FC<DomainMapProps> = ({ locations }) => {
  // Simple map visualization with locations list
  // In a real implementation, you could integrate with a mapping library like Leaflet or Mapbox
  
  const uniqueLocations = locations.reduce((acc, location) => {
    const key = `${location.city}-${location.regionName}`;
    if (!acc[key]) {
      acc[key] = {
        ...location,
        domains: [location.domain]
      };
    } else {
      acc[key].domains.push(location.domain);
    }
    return acc;
  }, {} as Record<string, DomainLocation & { domains: string[] }>);

  const locationList = Object.values(uniqueLocations);

  return (
    <div className="space-y-6">
      <div className="text-center p-8 bg-muted rounded-lg border-2 border-dashed border-border">
        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
        <p className="text-muted-foreground mb-4">
          Enhanced map visualization with domain locations and glow effects
        </p>
        <div className="text-sm text-muted-foreground">
          {locations.length > 0 ? 
            `Found ${locations.length} domains across ${locationList.length} unique locations` :
            'No location data available. Search for credentials to see domain locations.'
          }
        </div>
      </div>

      {locationList.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Domain Locations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationList.map((location, index) => (
              <div 
                key={index} 
                className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 animate-glow-pulse"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-foreground">
                        {location.city}, {location.regionName}
                      </h5>
                      <span className="text-sm text-muted-foreground">({location.country})</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Coordinates: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {location.domains.slice(0, 3).map((domain, domainIndex) => (
                          <span 
                            key={domainIndex}
                            className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {domain}
                          </span>
                        ))}
                        {location.domains.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                            +{location.domains.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};