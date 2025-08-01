import { OnboardingCard, InfoSection, LinkButton } from "@/components/OnboardingCard";
import { Home, UtensilsCrossed, Bus, MapPin, Wifi, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Vilnius = () => {
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
              Welcome to Vilnius
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to settling into Lithuania's vibrant capital. 
            Everything you need to know to make Vilnius feel like home.
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
              title="Popular Neighborhoods"
              items={[
                "Old Town (Senamiestis) - Historic charm, cobblestone streets, perfect for culture lovers",
                "Užupis - Bohemian district with artistic vibe, great cafes and galleries", 
                "New Town (Naujamiestis) - Modern amenities, shopping centers, business district",
                "Žvėrynas - Quiet residential area with green spaces and family-friendly atmosphere"
              ]}
            />

            <InfoSection
              title="Housing Platforms"
              items={[
                "Aruodas.lt - Lithuania's largest real estate platform",
                "Skelbiu.lt - Local classified ads with housing section",
                "Facebook groups: 'Rent in Vilnius', 'Vilnius Housing'",
                "Rental agencies: Ober-Haus, Inreal, Baltic Sotheby's"
              ]}
            />

            <InfoSection
              title="Important Tips"
              items={[
                "Average rent: €400-800 for 1-2 bedroom apartments in city center",
                "Security deposit typically 1-2 months rent",
                "Utilities (heating, water, internet) usually €100-150/month",
                "Most landlords require proof of income and employment contract"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.aruodas.lt">Aruodas.lt</LinkButton>
              <LinkButton href="https://www.skelbiu.lt">Skelbiu.lt</LinkButton>
              <LinkButton href="https://www.ober-haus.com">Ober-Haus</LinkButton>
            </div>
          </OnboardingCard>

          {/* Food & Dining Section */}
          <OnboardingCard
            title="Food & Dining"
            icon={<UtensilsCrossed className="w-6 h-6" />}
          >
            <InfoSection
              title="Essential Grocery Stores"
              items={[
                "Maxima - Large supermarket chain with locations throughout the city",
                "Rimi - Popular chain with good selection and competitive prices",
                "IKI - Budget-friendly option with weekly promotions",
                "Lidl - German discount chain with quality products at low prices"
              ]}
            />

            <InfoSection
              title="Local Food Markets"
              items={[
                "Hales Market (Halės turgus) - Historic central market with local produce",
                "Kalvarijų Market - Traditional market with fresh foods and local specialties",
                "Organic farmers markets on weekends in Bernardinų Garden",
                "Christmas markets in winter at Town Hall Square"
              ]}
            />

            <InfoSection
              title="Must-Try Restaurants"
              items={[
                "Ertlio Namas - Fine dining with modern Lithuanian cuisine",
                "Džiaugsmas - Creative dishes using local ingredients", 
                "Lokys - Traditional Lithuanian restaurant in medieval cellar",
                "Sweet Root - Michelin-recommended vegetarian fine dining"
              ]}
            />

            <InfoSection
              title="Food Apps & Delivery"
              items={[
                "Wolt - Most popular food delivery app in Vilnius",
                "Bolt Food - Competitive delivery service with good selection",
                "Glovo - International platform with local restaurants",
                "Restaurant websites often offer direct delivery"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://wolt.com">Wolt</LinkButton>
              <LinkButton href="https://food.bolt.eu">Bolt Food</LinkButton>
              <LinkButton href="https://glovoapp.com">Glovo</LinkButton>
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
                "Single ticket: €1.00 (bus/trolleybus), valid for 30 minutes",
                "Monthly pass: €25 for unlimited travel within city limits",
                "Vilnius Card: Tourist card including public transport and discounts",
                "Night buses run from 11 PM to 6 AM on main routes"
              ]}
            />

            <InfoSection
              title="Payment Methods"
              items={[
                "JUDU app - Official public transport app for tickets",
                "Contactless payment with bank cards on buses",
                "Paper tickets available at kiosks and from drivers",
                "Reusable plastic cards available at transport centers"
              ]}
            />

            <InfoSection
              title="Alternative Transportation"
              items={[
                "CityBee - Car sharing service with electric and regular cars",
                "Bolt - Ride-sharing app, widely used and reliable",
                "Bike sharing: CityBee bikes available throughout the city",
                "Walking-friendly city center with pedestrian zones"
              ]}
            />

            <InfoSection
              title="Key Transport Hubs"
              items={[
                "Vilnius Central Station - Main railway station and bus terminal",
                "Vilnius Airport - 7km from city center, bus connections available",
                "Cathedral Square - Central bus stop for many city routes", 
                "Lukiškės Square - Major transport interchange point"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.stops.lt">Route Planning</LinkButton>
              <LinkButton href="https://www.citybee.lt">CityBee</LinkButton>
              <LinkButton href="https://bolt.eu">Bolt</LinkButton>
            </div>
          </OnboardingCard>

          {/* Essential Services Section */}
          <OnboardingCard
            title="Essential Services"
            icon={<Wifi className="w-6 h-6" />}
          >
            <InfoSection
              title="Internet & Mobile"
              items={[
                "Telia - Largest telecom provider with good coverage",
                "Bite - Competitive plans and good customer service",
                "Tele2 - Budget-friendly options with decent coverage",
                "Free WiFi available in most cafes, malls, and public spaces"
              ]}
            />

            <InfoSection
              title="Banking"
              items={[
                "SEB - International bank with English-speaking services",
                "Swedbank - Popular choice for residents and businesses",
                "Luminor - Modern digital banking with good mobile app",
                "Revolut - Digital bank popular among expats"
              ]}
            />

            <InfoSection
              title="Healthcare"
              items={[
                "European Health Insurance Card accepted for EU citizens",
                "Private clinics: Northway, Affidea, Baltic-American Medical",
                "Emergency number: 112 for all emergency services",
                "Pharmacies (vaistinės) open late include Camelia and Eurovaistinė"
              ]}
            />

            <div className="flex flex-wrap gap-3 mt-6">
              <LinkButton href="https://www.telia.lt">Telia</LinkButton>
              <LinkButton href="https://www.seb.lt">SEB Bank</LinkButton>
              <LinkButton href="https://www.northway.lt">Northway Medical</LinkButton>
            </div>
          </OnboardingCard>

        </div>

        {/* Footer */}
        <div className="text-center mt-16 p-8 bg-card/50 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-4">
            Join expat communities and local Facebook groups for real-time advice and connections.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="https://www.facebook.com/groups/vilnius.expats">Vilnius Expats</LinkButton>
            <LinkButton href="https://www.vilnius-tourism.lt">Official Tourism</LinkButton>
            <LinkButton href="https://www.expatica.com/lt">Expatica Lithuania</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vilnius;