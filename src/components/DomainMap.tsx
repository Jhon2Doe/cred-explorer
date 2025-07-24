import React from 'react';
import { WorldMap } from './WorldMap';

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
  return <WorldMap locations={locations} />;
};