import React, { useState } from 'react';
import { Eye, EyeOff, MapPin, Globe, Clock, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface DomainLocation {
  domain: string;
  city: string;
  regionName: string;
  country: string;
  lat: number;
  lon: number;
}

interface CredentialCardProps {
  credential: Credential;
  location?: DomainLocation;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ credential, location }) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${field} copied successfully`,
      });
    });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const maskPassword = (password: string) => {
    if (password === '[NOT_SAVED]') return password;
    return '•'.repeat(Math.min(password.length, 12));
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground truncate">
                {credential.domain || 'Unknown Domain'}
              </h3>
              {getStatusBadge(credential.status)}
            </div>
            {location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{location.city}, {location.regionName}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {credential.url && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">URL</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-muted p-2 rounded text-muted-foreground truncate">
                {credential.url}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(credential.url, 'URL')}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Username</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-muted p-2 rounded text-foreground">
              {credential.username}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(credential.username, 'Username')}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Password</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-muted p-2 rounded text-foreground">
              {showPassword ? credential.password : maskPassword(credential.password)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(credential.password, 'Password')}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <Clock className="w-3 h-3" />
          <span>Added: {formatDate(credential.time)}</span>
        </div>
      </CardContent>
    </Card>
  );
};