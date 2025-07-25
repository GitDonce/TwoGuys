import { OnboardingCard, InfoSection, LinkButton } from "@/components/OnboardingCard";
import { Home, UtensilsCrossed, Bus, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Utena = () => {
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
              Welcome to Utena
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your guide to Lithuania's peaceful lakeside city. Discover serene nature, 
            affordable living, and a close-knit community in the heart of Aukštaitija region.
          </p>
        </div>

        {/* Onboarding Cards */}
        <div className="space-y-8">
          
          {/* Housing Section */}
          <OnboardingCard
            title="Find Your Home"
            icon={<Home className="w-6 h-6" />}
            defaultExpanded={true}
          >
            <InfoSection
              title="Popular Areas"
              items={[
                "City Center - Close to shops, restaurants, and public services",
                "Lakeside Districts - Peaceful areas near Utena Lake with beautiful views", 
                "Aukštakalnis - Elevated residential area with panoramic city views",
                "Industrial Zone - Budget-friendly housing near employment centers"
              ]}
            />

            <InfoSection
              title="Housing Platforms"
              items={[
                "Aruodas.lt - Main platform with Utena listings",
                "Skelbiu.lt - Local classified ads with good regional coverage",
                "Local Facebook groups: 'Utenos skelbimų lenta'",
                "Direct contact with local real estate agents"
              ]}
            />

            <InfoSection
              title="Cost of Living"
              items={[
                "Average rent: €200-400 for 1-2 bedroom apartments",
                "House rental: €300-600 per month depending on location",
                "Utilities typically €50-100/month (heating, water, internet)",
                "Property prices significantly lower than Vilnius"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.aruodas.lt">Aruodas.lt</LinkButton>
              <LinkButton href="https://www.skelbiu.lt">Skelbiu.lt</LinkButton>
            </div>
          </OnboardingCard>

          {/* Food & Dining Section */}
          <OnboardingCard
            title="Food & Dining"
            icon={<UtensilsCrossed className="w-6 h-6" />}
          >
            <InfoSection
              title="Grocery Stores"
              items={[
                "Maxima - Main supermarket chain with multiple locations",
                "Norfa - Local chain popular with residents",
                "IKI - Budget-friendly option with good selection",
                "Local markets on Wednesday and Saturday mornings"
              ]}
            />

            <InfoSection
              title="Local Specialties"
              items={[
                "Fresh fish from local lakes - pike, perch, and bream",
                "Wild mushrooms and berries in season",
                "Local honey and dairy products from nearby farms",
                "Traditional Lithuanian bread from local bakeries"
              ]}
            />

            <InfoSection
              title="Restaurants & Cafes"
              items={[
                "Utenos Alaus Darykla - Local brewery with traditional food",
                "Senoji Kibininė - Traditional kibinai and local dishes", 
                "Kavos Akademija - Cozy cafe with excellent coffee",
                "Ežero Terasa - Lakeside dining with scenic views"
              ]}
            />

            <InfoSection
              title="Food Shopping Tips"
              items={[
                "Local farmers markets offer fresh produce at lower prices",
                "Seasonal foods are abundant and affordable",
                "Many residents grow their own vegetables",
                "Traditional Lithuanian preserved foods available year-round"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.utenos-alus.lt">Utenos Brewery</LinkButton>
            </div>
          </OnboardingCard>

          {/* Transportation Section */}
          <OnboardingCard
            title="Getting Around"
            icon={<Bus className="w-6 h-6" />}
          >
            <InfoSection
              title="Public Transportation"
              items={[
                "City buses: €0.60 per ride, covers most residential areas",
                "Walking is common - city center easily accessible on foot",
                "Bicycle-friendly with dedicated paths and bike parking",
                "Regional buses connect to Vilnius, Panevėžys, and other cities"
              ]}
            />

            <InfoSection
              title="Intercity Travel"
              items={[
                "Bus to Vilnius: €8-12, approximately 2 hours journey",
                "Regular connections to Panevėžys and Kaunas",
                "Train service available to major Lithuanian cities",
                "Car rental available for exploring Aukštaitija National Park"
              ]}
            />

            <InfoSection
              title="Local Transportation"
              items={[
                "Many residents use bicycles for daily commuting",
                "Taxi services available via phone booking",
                "Car sharing less common but private car ownership high",
                "Walking paths around lakes popular for recreation"
              ]}
            />

            <InfoSection
              title="Getting to Utena"
              items={[
                "From Vilnius Airport: Bus to city center, then regional bus",
                "Direct bus from Vilnius Bus Station multiple times daily",
                "By car: 2-hour drive from Vilnius via A14 highway",
                "Train connections through Panevėžys junction"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.autobusubilietai.lt">Bus Tickets</LinkButton>
            </div>
          </OnboardingCard>

          {/* Nature & Recreation Section */}
          <OnboardingCard
            title="Nature & Recreation"
            icon={<MapPin className="w-6 h-6" />}
          >
            <InfoSection
              title="Aukštaitija National Park"
              items={[
                "Lithuania's oldest national park, just outside the city",
                "Over 100 lakes perfect for swimming and fishing",
                "Hiking trails through pristine forests and wetlands",
                "Traditional wooden architecture and ethnographic villages"
              ]}
            />

            <InfoSection
              title="Lakes & Water Activities"
              items={[
                "Lake Utena - city's main lake with beach and recreation areas",
                "Swimming areas with facilities during summer months",
                "Fishing permits available for numerous lakes",
                "Kayaking and canoeing popular on interconnected waterways"
              ]}
            />

            <InfoSection
              title="Outdoor Activities"
              items={[
                "Extensive forest trails for hiking and mushroom picking",
                "Cross-country skiing in winter months",
                "Cycling paths throughout the city and surrounding areas",
                "Bird watching in wetland areas and nature reserves"
              ]}
            />

            <InfoSection
              title="Cultural Sites"
              items={[
                "Utena Regional Museum with local history exhibitions",
                "Traditional craft workshops and pottery studios",
                "Annual folk festivals and cultural events",
                "Historical churches and architectural monuments"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.anp.lt">National Park</LinkButton>
              <LinkButton href="https://www.utena.lt">City Website</LinkButton>
            </div>
          </OnboardingCard>

        </div>

        {/* Footer */}
        <div className="text-center mt-16 p-8 bg-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-2">Living in Utena</h3>
          <p className="text-muted-foreground mb-4">
            Join local communities and connect with nature lovers who chose Utena for its peaceful lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="https://www.facebook.com/groups/utenos.bendruomene">Utena Community</LinkButton>
            <LinkButton href="https://www.utena.lt">City Council</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utena;