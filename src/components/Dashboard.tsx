import React, { useState, useEffect } from 'react';
import { Search, Database, Shield, AlertTriangle, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CredentialCard } from './CredentialCard';
import { StatsHeader } from './StatsHeader';
import { GlobalVisualization } from './GlobalVisualization';
import { toast } from '@/hooks/use-toast';

interface Credential {
  id: string;
  domain: string;
  url: string;
  username: string;
  password: string;
  time: string;
  status: number;
}

interface ApiResponse {
  data: Credential[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

interface DomainLocation {
  domain: string;
  city: string;
  regionName: string;
  country: string;
  lat: number;
  lon: number;
}

const Dashboard: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'domain' | 'username'>('domain');
  const [domainLocations, setDomainLocations] = useState<DomainLocation[]>([]);

  const baseUrl = 'http://192.168.102.55:8080';

  const fetchCredentials = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data: ApiResponse = await response.json();
      setCredentials(data.data);
      
      // Get unique domains for geolocation
      const uniqueDomains = [...new Set(data.data.map(cred => cred.domain).filter(Boolean))];
      await fetchDomainLocations(uniqueDomains);
      
      toast({
        title: "Data loaded successfully",
        description: `Found ${data.data.length} credentials`,
      });
    } catch (error) {
      console.error('Error fetching credentials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDomainLocations = async (domains: string[]) => {
    const locations: DomainLocation[] = [];
    
    for (const domain of domains) {
      if (!domain) continue;
      
      try {
        const response = await fetch(`http://ip-api.com/json/${domain}`);
        if (response.ok) {
          const locationData = await response.json();
          if (locationData.status === 'success') {
            locations.push({
              domain,
              city: locationData.city,
              regionName: locationData.regionName,
              country: locationData.country,
              lat: locationData.lat,
              lon: locationData.lon,
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching location for ${domain}:`, error);
      }
    }
    
    setDomainLocations(locations);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const endpoint = `${baseUrl}/api/ulps/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`;
    fetchCredentials(endpoint);
  };

  const handleStatusFilter = (status: string) => {
    const endpoint = `${baseUrl}/api/ulps?limit=100&status=${status}`;
    fetchCredentials(endpoint);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge className="bg-success text-white">Active</Badge>;
      case 2:
        return <Badge className="bg-danger text-white">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-8">
        <StatsHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Search Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="w-5 h-5" />
                  Search Credentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end mb-4">
                  <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                      Search Query
                    </label>
                    <Input
                      id="search"
                      placeholder="Enter domain or username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="w-48">
                    <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                      Search Type
                    </label>
                    <Select value={searchType} onValueChange={(value: 'domain' | 'username') => setSearchType(value)}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domain">Domain</SelectItem>
                        <SelectItem value="username">Username</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleSearch} 
                    disabled={loading || !searchQuery.trim()}
                    className="bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-glow transition-all duration-300"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleStatusFilter('1')}
                    disabled={loading}
                    variant="secondary"
                    className="bg-success hover:bg-success/90 text-white"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {loading ? 'Loading...' : 'Load Approved'}
                  </Button>
                  <Button 
                    onClick={() => handleStatusFilter('2')}
                    disabled={loading}
                    variant="secondary"
                    className="bg-danger hover:bg-danger/90 text-white"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {loading ? 'Loading...' : 'Load Rejected'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Stats */}
          <div>
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{credentials.length}</p>
                  <p className="text-sm text-muted-foreground">Total Results</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{domainLocations.length}</p>
                  <p className="text-sm text-muted-foreground">Unique Locations</p>
                </div>
                {domainLocations.length > 0 && (
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {[...new Set(domainLocations.map(loc => loc.country))].length}
                    </p>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Global Threat Visualization */}
        {domainLocations.length > 0 && (
          <div className="mb-8">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="w-5 h-5" />
                  Global Threat Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GlobalVisualization locations={domainLocations} />
              </CardContent>
            </Card>
          </div>
        )}

        {credentials.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Results ({credentials.length} credentials)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.map((credential) => (
                <CredentialCard
                  key={credential.id}
                  credential={credential}
                  location={domainLocations.find(loc => loc.domain === credential.domain)}
                />
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;