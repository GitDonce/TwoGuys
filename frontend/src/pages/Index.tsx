import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Code, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import vilniusIcon from "@/assets/vilnius-icon.png";
import utenaIcon from "@/assets/utena-icon.png";

interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  population: string;
  highlights: string[];
  icon: string;
  path: string;
}

const cities: City[] = [
  {
    id: "vilnius",
    name: "Vilnius",
    country: "Lithuania",
    description: "Lithuania's vibrant capital city with rich history and modern amenities",
    population: "580,000",
    highlights: ["UNESCO Old Town", "Bohemian Užupis District", "Modern Business Centers", "Rich Cultural Scene"],
    icon: vilniusIcon,
    path: "/vilnius"
  },
  {
    id: "utena",
    name: "Utena",
    country: "Lithuania",
    description: "Peaceful lakeside city perfect for nature lovers and quiet living",
    population: "27,000",
    highlights: ["Beautiful Lakes", "Aukštaitija National Park", "Peaceful Environment", "Lower Living Costs"],
    icon: utenaIcon,
    path: "/utena"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.highlights.some(highlight => 
      highlight.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            City Onboarding Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your comprehensive guide to settling into Lithuania's beautiful cities. 
            Find everything you need to make your new city feel like home.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-center shadow-soft border-0 bg-card/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {filteredCities.map((city) => (
            <Link key={city.id} to={city.path} className="block group">
              <Card className={cn(
                "transition-all duration-300 hover:shadow-medium border-0 shadow-soft",
                "group-hover:scale-105 group-hover:-translate-y-2"
              )}>
                <CardContent className="p-8">
                  {/* City Icon & Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary-light p-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <img 
                        src={city.icon} 
                        alt={`${city.name} icon`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        {city.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {city.country} • {city.population} people
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {city.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Key Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {city.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">
                      Explore {city.name} Guide
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">
              No cities found matching "{searchTerm}"
            </div>
            <p className="text-muted-foreground">
              Try adjusting your search or browse all available cities above.
            </p>
          </div>
        )}

        {/* API Test Section */}
        <div className="mb-16">
          <Link to="/api-test" className="block group">
            <Card className={cn(
              "transition-all duration-300 hover:shadow-medium border-0 shadow-soft",
              "group-hover:scale-105 group-hover:-translate-y-2"
            )}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent-light p-3 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Database className="w-full h-full text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      API Test Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                      Test backend connectivity and API endpoints
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  Access the interactive dashboard to test the connection between frontend and backend. 
                  Create, read, update, and delete items through our mock API endpoints.
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Available Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      Backend Health Check
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      CRUD Operations
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      Real-time Updates
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      Error Handling
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">
                    Test API Connection
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 p-8 bg-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-2">Don't See Your City?</h3>
          <p className="text-muted-foreground mb-4">
            We're continuously adding new cities to our onboarding platform.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact us to suggest a new city or contribute local knowledge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;