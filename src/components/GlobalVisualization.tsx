import React, { useEffect, useState } from 'react';

interface DomainLocation {
  domain: string;
  city: string;
  regionName: string;
  country: string;
  lat: number;
  lon: number;
}

interface GlobalVisualizationProps {
  locations: DomainLocation[];
}

// Country code listing for better tracking
const countryCodeMap: Record<string, string> = {
  'United States': 'US',
  'USA': 'US',
  'Canada': 'CA',
  'Mexico': 'MX',
  'Brazil': 'BR',
  'Argentina': 'AR',
  'United Kingdom': 'GB',
  'Germany': 'DE',
  'France': 'FR',
  'Italy': 'IT',
  'Spain': 'ES',
  'Russia': 'RU',
  'China': 'CN',
  'Japan': 'JP',
  'India': 'IN',
  'Australia': 'AU',
  'South Africa': 'ZA',
  'Egypt': 'EG',
  'Nigeria': 'NG',
  'Kenya': 'KE',
  'Saudi Arabia': 'SA',
  'Turkey': 'TR',
  'Iran': 'IR',
  'Pakistan': 'PK',
  'Bangladesh': 'BD',
  'Thailand': 'TH',
  'Vietnam': 'VN',
  'Indonesia': 'ID',
  'Philippines': 'PH',
  'Malaysia': 'MY',
  'Singapore': 'SG',
  'South Korea': 'KR',
  'North Korea': 'KP',
  'Mongolia': 'MN',
  'Kazakhstan': 'KZ',
  'Ukraine': 'UA',
  'Poland': 'PL',
  'Romania': 'RO',
  'Greece': 'GR',
  'Portugal': 'PT',
  'Netherlands': 'NL',
  'Belgium': 'BE',
  'Switzerland': 'CH',
  'Austria': 'AT',
  'Czech Republic': 'CZ',
  'Hungary': 'HU',
  'Bulgaria': 'BG',
  'Croatia': 'HR',
  'Serbia': 'RS',
  'Bosnia and Herzegovina': 'BA',
  'Slovenia': 'SI',
  'Slovakia': 'SK',
  'Lithuania': 'LT',
  'Latvia': 'LV',
  'Estonia': 'EE',
  'Finland': 'FI',
  'Sweden': 'SE',
  'Norway': 'NO',
  'Denmark': 'DK',
  'Iceland': 'IS',
  'Ireland': 'IE',
  'Algeria': 'DZ',
  'Morocco': 'MA',
  'Tunisia': 'TN',
  'Libya': 'LY',
  'Sudan': 'SD',
  'Ethiopia': 'ET',
  'Somalia': 'SO',
  'Chad': 'TD',
  'Niger': 'NE',
  'Mali': 'ML',
  'Burkina Faso': 'BF',
  'Ghana': 'GH',
  'Ivory Coast': 'CI',
  'Guinea': 'GN',
  'Senegal': 'SN',
  'Mauritania': 'MR',
  'Cameroon': 'CM',
  'Central African Republic': 'CF',
  'Democratic Republic of the Congo': 'CD',
  'Republic of the Congo': 'CG',
  'Gabon': 'GA',
  'Equatorial Guinea': 'GQ',
  'Zambia': 'ZM',
  'Zimbabwe': 'ZW',
  'Botswana': 'BW',
  'Namibia': 'NA',
  'Angola': 'AO',
  'Mozambique': 'MZ',
  'Madagascar': 'MG',
  'Tanzania': 'TZ',
  'Uganda': 'UG',
  'Rwanda': 'RW',
  'Burundi': 'BI',
  'Malawi': 'MW',
  'Qatar': 'QA',
  'UAE': 'AE',
  'United Arab Emirates': 'AE',
  'Kuwait': 'KW',
  'Bahrain': 'BH',
  'Oman': 'OM',
  'Yemen': 'YE',
  'Iraq': 'IQ',
  'Syria': 'SY',
  'Lebanon': 'LB',
  'Jordan': 'JO',
  'Israel': 'IL',
  'Palestine': 'PS',
  'Cyprus': 'CY',
  'Georgia': 'GE',
  'Armenia': 'AM',
  'Azerbaijan': 'AZ',
  'Afghanistan': 'AF',
  'Uzbekistan': 'UZ',
  'Turkmenistan': 'TM',
  'Tajikistan': 'TJ',
  'Kyrgyzstan': 'KG',
  'Nepal': 'NP',
  'Bhutan': 'BT',
  'Sri Lanka': 'LK',
  'Myanmar': 'MM',
  'Laos': 'LA',
  'Cambodia': 'KH',
  'Brunei': 'BN',
  'East Timor': 'TL',
  'Papua New Guinea': 'PG',
  'New Zealand': 'NZ',
  'Fiji': 'FJ',
  'Chile': 'CL',
  'Peru': 'PE',
  'Ecuador': 'EC',
  'Colombia': 'CO',
  'Venezuela': 'VE',
  'Guyana': 'GY',
  'Suriname': 'SR',
  'French Guiana': 'GF',
  'Uruguay': 'UY',
  'Paraguay': 'PY',
  'Bolivia': 'BO',
  'Panama': 'PA',
  'Costa Rica': 'CR',
  'Nicaragua': 'NI',
  'Honduras': 'HN',
  'El Salvador': 'SV',
  'Guatemala': 'GT',
  'Belize': 'BZ',
  'Cuba': 'CU',
  'Jamaica': 'JM',
  'Haiti': 'HT',
  'Dominican Republic': 'DO',
  'Puerto Rico': 'PR',
  'Trinidad and Tobago': 'TT',
  'Barbados': 'BB',
  'Bahamas': 'BS'
};

export const GlobalVisualization: React.FC<GlobalVisualizationProps> = ({ locations }) => {
  const [glowingCountries, setGlowingCountries] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (locations.length > 0) {
      const countries = new Set<string>();
      locations.forEach(location => {
        const countryCode = countryCodeMap[location.country] || location.country;
        countries.add(countryCode);
      });
      setGlowingCountries(countries);
    }
  }, [locations]);

  // Simplified world map paths for major countries/regions
  const countryPaths: Record<string, string> = {
    // North America
    'US': 'M200,180 L280,180 L290,200 L290,240 L280,260 L200,260 L190,240 L190,200 Z',
    'CA': 'M180,120 L300,120 L310,160 L290,180 L200,180 L180,160 Z',
    'MX': 'M200,260 L280,260 L270,290 L210,290 Z',
    
    // South America
    'BR': 'M320,320 L380,320 L390,380 L380,420 L320,420 L310,380 Z',
    'AR': 'M300,420 L350,420 L340,480 L310,480 Z',
    'PE': 'M280,350 L320,350 L310,380 L290,380 Z',
    'CO': 'M280,320 L320,320 L310,340 L290,340 Z',
    'VE': 'M320,300 L360,300 L350,320 L330,320 Z',
    'CL': 'M290,400 L310,400 L305,480 L295,480 Z',
    
    // Europe
    'GB': 'M460,160 L480,160 L485,180 L475,190 L465,185 L460,175 Z',
    'FR': 'M480,180 L510,180 L515,210 L485,210 Z',
    'DE': 'M510,160 L540,160 L545,190 L515,190 Z',
    'IT': 'M520,200 L540,200 L535,230 L525,230 Z',
    'ES': 'M460,200 L490,200 L485,230 L465,230 Z',
    'RU': 'M540,120 L680,120 L690,200 L550,200 Z',
    'UA': 'M540,180 L580,180 L575,200 L545,200 Z',
    'PL': 'M520,160 L550,160 L545,180 L525,180 Z',
    'NO': 'M500,100 L530,100 L525,140 L505,140 Z',
    'SE': 'M520,100 L540,100 L535,140 L525,140 Z',
    'FI': 'M540,100 L570,100 L565,140 L545,140 Z',
    
    // Asia
    'CN': 'M680,180 L760,180 L755,240 L685,240 Z',
    'IN': 'M620,260 L680,260 L675,320 L625,320 Z',
    'JP': 'M780,200 L800,200 L795,240 L785,240 Z',
    'KR': 'M760,200 L780,200 L775,220 L765,220 Z',
    'TH': 'M700,280 L720,280 L715,310 L705,310 Z',
    'VN': 'M720,280 L740,280 L735,320 L725,320 Z',
    'ID': 'M720,340 L780,340 L775,370 L725,370 Z',
    'MY': 'M700,320 L740,320 L735,340 L705,340 Z',
    'PH': 'M760,300 L780,300 L775,340 L765,340 Z',
    'AU': 'M720,400 L800,400 L795,450 L725,450 Z',
    'NZ': 'M820,440 L840,440 L835,460 L825,460 Z',
    'KZ': 'M580,160 L640,160 L635,200 L585,200 Z',
    'MN': 'M660,160 L700,160 L695,180 L665,180 Z',
    'IR': 'M580,200 L620,200 L615,240 L585,240 Z',
    'SA': 'M560,240 L600,240 L595,280 L565,280 Z',
    'TR': 'M540,200 L580,200 L575,220 L545,220 Z',
    'PK': 'M600,240 L630,240 L625,270 L605,270 Z',
    'AF': 'M600,220 L630,220 L625,240 L605,240 Z',
    'BD': 'M660,260 L680,260 L675,280 L665,280 Z',
    'MM': 'M680,280 L700,280 L695,320 L685,320 Z',
    'KH': 'M700,300 L720,300 L715,320 L705,320 Z',
    'LA': 'M700,280 L720,280 L715,300 L705,300 Z',
    'SG': 'M720,320 L730,320 L728,325 L722,325 Z',
    'BN': 'M740,320 L750,320 L748,330 L742,330 Z',
    'QA': 'M580,260 L590,260 L588,270 L582,270 Z',
    'AE': 'M590,260 L600,260 L598,270 L592,270 Z',
    'KW': 'M575,250 L585,250 L583,260 L577,260 Z',
    'BH': 'M585,255 L590,255 L588,260 L583,260 Z',
    'OM': 'M600,270 L615,270 L613,285 L602,285 Z',
    'YE': 'M570,280 L590,280 L585,300 L575,300 Z',
    'IQ': 'M570,220 L590,220 L585,250 L575,250 Z',
    'SY': 'M550,220 L570,220 L565,235 L555,235 Z',
    'LB': 'M545,225 L555,225 L553,235 L547,235 Z',
    'JO': 'M555,235 L570,235 L565,250 L560,250 Z',
    'IL': 'M550,235 L560,235 L558,250 L552,250 Z',
    'CY': 'M540,225 L550,225 L548,235 L542,235 Z',
    'GE': 'M570,200 L585,200 L583,210 L572,210 Z',
    'AM': 'M570,210 L580,210 L578,220 L572,220 Z',
    'AZ': 'M580,210 L595,210 L593,220 L582,220 Z',
    'UZ': 'M600,180 L630,180 L625,200 L605,200 Z',
    'TM': 'M580,200 L610,200 L605,220 L585,220 Z',
    'TJ': 'M620,200 L640,200 L635,220 L625,220 Z',
    'KG': 'M630,180 L650,180 L645,200 L635,200 Z',
    'NP': 'M640,250 L660,250 L655,265 L645,265 Z',
    'BT': 'M660,250 L675,250 L673,260 L662,260 Z',
    'LK': 'M650,320 L665,320 L663,340 L652,340 Z',
    
    // Africa
    'EG': 'M540,240 L570,240 L565,270 L545,270 Z',
    'LY': 'M500,240 L540,240 L535,270 L505,270 Z',
    'DZ': 'M460,240 L500,240 L495,280 L465,280 Z',
    'MA': 'M440,240 L470,240 L465,270 L445,270 Z',
    'TN': 'M490,240 L510,240 L505,260 L495,260 Z',
    'SD': 'M540,270 L570,270 L565,310 L545,310 Z',
    'ET': 'M570,290 L600,290 L595,320 L575,320 Z',
    'SO': 'M600,290 L620,290 L615,340 L605,340 Z',
    'KE': 'M580,320 L600,320 L595,350 L585,350 Z',
    'TZ': 'M560,340 L580,340 L575,370 L565,370 Z',
    'UG': 'M560,310 L580,310 L575,330 L565,330 Z',
    'RW': 'M555,330 L565,330 L563,340 L557,340 Z',
    'BI': 'M555,340 L565,340 L563,350 L557,350 Z',
    'CD': 'M520,320 L560,320 L555,380 L525,380 Z',
    'CG': 'M510,320 L530,320 L525,350 L515,350 Z',
    'CM': 'M500,300 L520,300 L515,330 L505,330 Z',
    'CF': 'M520,300 L550,300 L545,320 L525,320 Z',
    'TD': 'M520,270 L550,270 L545,300 L525,300 Z',
    'NE': 'M480,280 L520,280 L515,310 L485,310 Z',
    'NG': 'M480,310 L510,310 L505,340 L485,340 Z',
    'BF': 'M460,300 L485,300 L480,320 L465,320 Z',
    'ML': 'M440,280 L480,280 L475,320 L445,320 Z',
    'SN': 'M420,300 L440,300 L435,320 L425,320 Z',
    'MR': 'M420,280 L450,280 L445,310 L425,310 Z',
    'GN': 'M420,320 L440,320 L435,340 L425,340 Z',
    'CI': 'M440,320 L465,320 L460,340 L445,340 Z',
    'GH': 'M465,320 L480,320 L475,340 L470,340 Z',
    'TG': 'M475,320 L485,320 L483,340 L477,340 Z',
    'BJ': 'M480,320 L490,320 L488,340 L482,340 Z',
    'LR': 'M430,340 L445,340 L440,355 L435,355 Z',
    'SL': 'M420,335 L435,335 L430,350 L425,350 Z',
    'GM': 'M420,305 L435,305 L433,315 L422,315 Z',
    'GW': 'M415,320 L425,320 L423,330 L417,330 Z',
    'CV': 'M400,310 L410,310 L408,320 L402,320 Z',
    'GA': 'M500,350 L515,350 L513,370 L502,370 Z',
    'GQ': 'M495,345 L505,345 L503,355 L497,355 Z',
    'ST': 'M490,350 L495,350 L493,355 L488,355 Z',
    'AO': 'M500,370 L530,370 L525,420 L505,420 Z',
    'ZM': 'M540,380 L570,380 L565,410 L545,410 Z',
    'MW': 'M570,380 L580,380 L578,410 L572,410 Z',
    'MZ': 'M580,380 L600,380 L595,430 L585,430 Z',
    'ZW': 'M540,410 L570,410 L565,430 L545,430 Z',
    'BW': 'M530,420 L550,420 L545,450 L535,450 Z',
    'NA': 'M510,420 L535,420 L530,460 L515,460 Z',
    'ZA': 'M530,450 L570,450 L565,480 L535,480 Z',
    'LS': 'M545,455 L555,455 L553,465 L547,465 Z',
    'SZ': 'M560,450 L570,450 L568,460 L562,460 Z',
    'MG': 'M600,420 L620,420 L615,470 L605,470 Z',
    'MU': 'M620,460 L630,460 L628,470 L622,470 Z',
    'SC': 'M620,420 L630,420 L628,430 L622,430 Z',
    'KM': 'M590,450 L600,450 L598,460 L592,460 Z',
    'DJ': 'M580,290 L590,290 L588,300 L582,300 Z',
    'ER': 'M570,285 L585,285 L583,295 L572,295 Z'
  };

  return (
    <div className="w-full bg-gradient-surface rounded-lg border border-border p-6">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Global Domain Distribution</h3>
        <p className="text-sm text-muted-foreground">
          {locations.length > 0 ? 
            `Showing ${glowingCountries.size} countries with detected domains` : 
            'No location data available'
          }
        </p>
      </div>
      
      <div className="flex justify-center">
        <svg
          viewBox="0 0 900 500"
          className="w-full max-w-4xl h-auto"
          style={{ background: 'hsl(var(--background))' }}
        >
          {/* Grid lines for better visualization */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            
            {/* Glow effect filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Pulse animation filter */}
            <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Render countries */}
          {Object.entries(countryPaths).map(([countryCode, path]) => {
            const isGlowing = glowingCountries.has(countryCode);
            const countryCount = locations.filter(loc => 
              (countryCodeMap[loc.country] || loc.country) === countryCode
            ).length;
            
            return (
              <g key={countryCode}>
                <path
                  d={path}
                  fill={isGlowing ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                  stroke={isGlowing ? 'hsl(var(--primary-glow))' : 'hsl(var(--border))'}
                  strokeWidth={isGlowing ? "2" : "1"}
                  filter={isGlowing ? "url(#pulse)" : "none"}
                  opacity={isGlowing ? "0.9" : "0.3"}
                  className={`transition-all duration-1000 hover:opacity-70 cursor-pointer ${isGlowing ? 'animate-glow-pulse' : ''}`}
                  style={{
                    transformOrigin: 'center',
                    filter: isGlowing ? 'drop-shadow(0 0 10px hsl(var(--primary-glow)))' : 'none'
                  }}
                >
                  <title>
                    {Object.entries(countryCodeMap).find(([name, code]) => code === countryCode)?.[0] || countryCode}
                    {isGlowing && ` (${countryCount} domains)`}
                  </title>
                </path>
                
                {/* Multiple pulse rings for active countries with staggered animations */}
                {isGlowing && (
                  <>
                    <path
                      d={path}
                      fill="none"
                      stroke="hsl(var(--primary-glow))"
                      strokeWidth="4"
                      opacity="0.4"
                      filter="url(#glow)"
                      className="animate-ping"
                      style={{ 
                        animationDuration: '3s',
                        animationDelay: '0s'
                      }}
                    />
                    <path
                      d={path}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity="0.6"
                      className="animate-ping"
                      style={{ 
                        animationDuration: '2s',
                        animationDelay: '1s'
                      }}
                    />
                    <path
                      d={path}
                      fill="none"
                      stroke="hsl(var(--primary-glow))"
                      strokeWidth="1"
                      opacity="0.8"
                      className="animate-pulse"
                      style={{ 
                        animationDuration: '1.5s',
                        animationDelay: '0.5s'
                      }}
                    />
                  </>
                )}
              </g>
            );
          })}
          
          {/* Legend */}
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="160" height="70" fill="hsl(var(--card))" stroke="hsl(var(--border))" rx="5"/>
            <text x="10" y="20" className="text-xs font-semibold" fill="hsl(var(--foreground))">Legend</text>
            
            <circle cx="20" cy="35" r="6" fill="hsl(var(--primary))" filter="url(#glow)"/>
            <text x="35" y="40" className="text-xs" fill="hsl(var(--foreground))">Active Domains</text>
            
            <circle cx="20" cy="55" r="6" fill="hsl(var(--muted))" opacity="0.4"/>
            <text x="35" y="60" className="text-xs" fill="hsl(var(--foreground))">No Data</text>
          </g>
          
          {/* Stats overlay */}
          {locations.length > 0 && (
            <g transform="translate(720, 20)">
              <rect x="0" y="0" width="160" height="100" fill="hsl(var(--card))" stroke="hsl(var(--border))" rx="5"/>
              <text x="10" y="20" className="text-xs font-semibold" fill="hsl(var(--foreground))">Statistics</text>
              
              <text x="10" y="40" className="text-xs" fill="hsl(var(--muted-foreground))">Total Domains:</text>
              <text x="10" y="55" className="text-sm font-bold" fill="hsl(var(--primary))">{locations.length}</text>
              
              <text x="10" y="75" className="text-xs" fill="hsl(var(--muted-foreground))">Countries:</text>
              <text x="10" y="90" className="text-sm font-bold" fill="hsl(var(--primary))">{glowingCountries.size}</text>
            </g>
          )}
        </svg>
      </div>
      
      {/* Active countries list */}
      {locations.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from(glowingCountries).map(countryCode => {
            const countryName = Object.entries(countryCodeMap).find(([name, code]) => code === countryCode)?.[0] || countryCode;
            const countryLocations = locations.filter(loc => 
              (countryCodeMap[loc.country] || loc.country) === countryCode
            );
            
            return (
              <div 
                key={countryCode}
                className="bg-card border border-primary/20 rounded-lg p-3 animate-glow-pulse"
                style={{ animationDelay: `${Math.random() * 2}s` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-semibold text-foreground">{countryName}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {countryLocations.length} domain{countryLocations.length !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-primary">
                  {countryLocations.slice(0, 2).map(loc => loc.domain).join(', ')}
                  {countryLocations.length > 2 && ` +${countryLocations.length - 2} more`}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};