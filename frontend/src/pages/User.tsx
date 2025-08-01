import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, MapPin, Users, Edit, Trash2, Eye, Home } from "lucide-react";
import { apiService, City } from "@/services/api";

const User = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple user data (no auth for now)
  const user = {
    name: "City Contributor",
    email: "contributor@example.com",
    joinDate: "November 2024"
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCities();
        if (response.success) {
          setCities(response.data || []);
        } else {
          setError('Failed to load cities');
        }
      } catch (err) {
        setError('Failed to load cities');
        console.error('Error fetching cities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleDeleteCity = async (cityId: string) => {
    if (!confirm('Are you sure you want to delete this city?')) {
      return;
    }

    try {
      const response = await apiService.deleteCity(cityId);
      if (response.success) {
        setCities(cities.filter(city => city.id !== cityId));
      } else {
        alert('Failed to delete city');
      }
    } catch (err) {
      alert('Failed to delete city');
      console.error('Error deleting city:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-card/50 mb-6">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              My Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your city guides and help others find their perfect home
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{cities.length}</div>
                <div className="text-sm text-muted-foreground">Cities Added</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add City CTA */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Add a New City</h3>
                <p className="text-muted-foreground">
                  Share your local knowledge and help newcomers settle in
                </p>
              </div>
              <Link to="/add-city">
                <Button size="lg" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Add City
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Cities List */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            My Cities
          </h2>
          <p className="text-muted-foreground">
            Cities you've contributed to the platform
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your cities...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            {cities.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Cities Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your first city guide to help others
                  </p>
                  <Link to="/add-city">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your First City
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => (
                  <Card key={city.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{city.name}</CardTitle>
                        <Badge variant="secondary">{city.country}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {city.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Population</div>
                        <div className="text-sm font-medium">{city.population || 'N/A'}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Highlights</div>
                        <div className="flex flex-wrap gap-1">
                          {city.highlights?.slice(0, 2).map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight.length > 15 ? `${highlight.slice(0, 15)}...` : highlight}
                            </Badge>
                          ))}
                          {city.highlights && city.highlights.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{city.highlights.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Sections</div>
                        <div className="text-sm font-medium">
                          {city.sections?.length || 0} detailed sections
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Link to={`/${city.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => {/* TODO: Add edit functionality */}}
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteCity(city.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer Stats */}
        {!loading && !error && cities.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{cities.length}</div>
                  <div className="text-sm text-muted-foreground">Total Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {cities.reduce((sum, city) => sum + (city.sections?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Sections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {cities.reduce((sum, city) => sum + (city.highlights?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Highlights</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {new Set(cities.map(city => city.country)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default User; 