import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { OnboardingCard, InfoSection, LinkButton } from "@/components/OnboardingCard";
import { Home, UtensilsCrossed, Bus, MapPin, Wifi, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService, City } from "@/services/api";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />,
  Bus: <Bus className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />
};

interface DynamicCityPageProps {
  cityId?: string;
}

const DynamicCityPage = ({ cityId: propCityId }: DynamicCityPageProps) => {
  const { cityId: paramsCityId } = useParams<{ cityId: string }>();
  const cityId = propCityId || paramsCityId || '';
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getCity(cityId);
        if (response.success && response.data) {
          setCity(response.data);
        } else {
          setError('City not found');
        }
      } catch (err) {
        setError('Failed to load city data');
        console.error('Error fetching city:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading city guide...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center py-16">
            <div className="text-red-500 text-lg mb-4">
              {error || 'City not found'}
            </div>
            <p className="text-muted-foreground mb-4">
              Unable to load the city guide. Please try again later.
            </p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-card/50">
              <ArrowLeft className="w-4 h-4" />
              Back to Cities
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome to {city.name}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {city.description}
          </p>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-8">
          {city.sections && city.sections.length > 0 ? (
            city.sections.map((section, index) => (
              <OnboardingCard
                key={index}
                title={section.title}
                icon={iconMap[section.icon] || <MapPin className="w-6 h-6" />}
                defaultExpanded={section.defaultExpanded}
              >
                {/* Info Sections */}
                {section.infoSections.map((infoSection, infoIndex) => (
                  <InfoSection
                    key={infoIndex}
                    title={infoSection.title}
                    items={infoSection.items}
                  />
                ))}

                {/* Links */}
                {section.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {section.links.map((link, linkIndex) => (
                      <LinkButton key={linkIndex} href={link.href}>
                        {link.text}
                      </LinkButton>
                    ))}
                  </div>
                )}
              </OnboardingCard>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No detailed sections available for this city.</p>
              <p className="text-sm text-muted-foreground mt-2">This city doesn't have detailed guides yet.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 p-8 bg-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-4">
            Join local communities and connect with others who chose {city.name} as their new home.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href={`https://www.facebook.com/groups/${city.name.toLowerCase()}.community`}>
              {city.name} Community
            </LinkButton>
            <LinkButton href={`https://www.${city.name.toLowerCase()}.lt`}>
              Official Website
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCityPage; 