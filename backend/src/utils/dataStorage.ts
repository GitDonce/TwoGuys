import fs from 'fs';
import path from 'path';

export interface Item {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface InfoSection {
  title: string;
  items: string[];
}

export interface LinkButton {
  text: string;
  href: string;
}

export interface CitySection {
  title: string;
  icon: string; // lucide icon name
  defaultExpanded?: boolean;
  infoSections: InfoSection[];
  links: LinkButton[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  population: string;
  highlights: string[];
  icon: string;
  path: string;
  sections?: CitySection[];
}

class DataStorage {
  private dataDir: string;
  private itemsFile: string;
  private citiesFile: string;

  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.itemsFile = path.join(this.dataDir, 'items.json');
    this.citiesFile = path.join(this.dataDir, 'cities.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.itemsFile)) {
      this.writeItems(this.getInitialItemsData());
    }
    
    if (!fs.existsSync(this.citiesFile)) {
      this.writeCities(this.getInitialCitiesData());
    }
  }

  private getInitialItemsData(): Item[] {
    return [
      {
        id: '1',
        title: 'Visit Vilnius Old Town',
        description: 'Explore the beautiful historic center of Vilnius',
        completed: false,
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        id: '2',
        title: 'Check out Utena Lakes',
        description: 'Visit the scenic lakes around Utena city',
        completed: true,
        createdAt: new Date('2024-01-10').toISOString()
      },
      {
        id: '3',
        title: 'Try Lithuanian cuisine',
        description: 'Sample traditional dishes like cepelinai and šaltibarščiai',
        completed: false,
        createdAt: new Date('2024-01-20').toISOString()
      }
    ];
  }

  private getInitialCitiesData(): City[] {
    return [
      {
        id: "vilnius",
        name: "Vilnius",
        country: "Lithuania",
        description: "Lithuania's vibrant capital city with rich history and modern amenities",
        population: "580,000",
        highlights: ["UNESCO Old Town", "Bohemian Užupis District", "Modern Business Centers", "Rich Cultural Scene"],
        icon: "/src/assets/vilnius-icon.png",
        path: "/vilnius",
        sections: [
          {
            title: "Find Your Home",
            icon: "Home",
            defaultExpanded: true,
            infoSections: [
              {
                title: "Popular Neighborhoods",
                items: [
                  "Old Town (Senamiestis) - Historic charm, cobblestone streets, perfect for culture lovers",
                  "Užupis - Bohemian district with artistic vibe, great cafes and galleries",
                  "New Town (Naujamiestis) - Modern amenities, shopping centers, business district",
                  "Žvėrynas - Quiet residential area with green spaces and family-friendly atmosphere"
                ]
              },
              {
                title: "Housing Platforms",
                items: [
                  "Aruodas.lt - Lithuania's largest real estate platform",
                  "Skelbiu.lt - Local classified ads with housing section",
                  "Facebook groups: 'Rent in Vilnius', 'Vilnius Housing'",
                  "Rental agencies: Ober-Haus, Inreal, Baltic Sotheby's"
                ]
              },
              {
                title: "Important Tips",
                items: [
                  "Average rent: €400-800 for 1-2 bedroom apartments in city center",
                  "Security deposit typically 1-2 months rent",
                  "Utilities (heating, water, internet) usually €100-150/month",
                  "Most landlords require proof of income and employment contract"
                ]
              }
            ],
            links: [
              { text: "Aruodas.lt", href: "https://www.aruodas.lt" },
              { text: "Skelbiu.lt", href: "https://www.skelbiu.lt" },
              { text: "Ober-Haus", href: "https://www.ober-haus.com" }
            ]
          },
          {
            title: "Food & Dining",
            icon: "UtensilsCrossed",
            infoSections: [
              {
                title: "Essential Grocery Stores",
                items: [
                  "Maxima - Large supermarket chain with locations throughout the city",
                  "Rimi - Popular chain with good selection and competitive prices",
                  "IKI - Budget-friendly option with weekly promotions",
                  "Lidl - German discount chain with quality products at low prices"
                ]
              },
              {
                title: "Local Food Markets",
                items: [
                  "Hales Market (Halės turgus) - Historic central market with local produce",
                  "Kalvarijų Market - Traditional market with fresh foods and local specialties",
                  "Organic farmers markets on weekends in Bernardinų Garden",
                  "Christmas markets in winter at Town Hall Square"
                ]
              },
              {
                title: "Must-Try Restaurants",
                items: [
                  "Ertlio Namas - Fine dining with modern Lithuanian cuisine",
                  "Džiaugsmas - Creative dishes using local ingredients",
                  "Lokys - Traditional Lithuanian restaurant in medieval cellar",
                  "Sweet Root - Michelin-recommended vegetarian fine dining"
                ]
              },
              {
                title: "Food Apps & Delivery",
                items: [
                  "Wolt - Most popular food delivery app in Vilnius",
                  "Bolt Food - Competitive delivery service with good selection",
                  "Glovo - International platform with local restaurants",
                  "Restaurant websites often offer direct delivery"
                ]
              }
            ],
            links: [
              { text: "Wolt", href: "https://wolt.com" },
              { text: "Bolt Food", href: "https://food.bolt.eu" },
              { text: "Glovo", href: "https://glovoapp.com" }
            ]
          },
          {
            title: "Getting Around",
            icon: "Bus",
            infoSections: [
              {
                title: "Public Transportation",
                items: [
                  "Single ticket: €1.00 (bus/trolleybus), valid for 30 minutes",
                  "Monthly pass: €25 for unlimited travel within city limits",
                  "Vilnius Card: Tourist card including public transport and discounts",
                  "Night buses run from 11 PM to 6 AM on main routes"
                ]
              },
              {
                title: "Payment Methods",
                items: [
                  "JUDU app - Official public transport app for tickets",
                  "Contactless payment with bank cards on buses",
                  "Paper tickets available at kiosks and from drivers",
                  "Reusable plastic cards available at transport centers"
                ]
              },
              {
                title: "Alternative Transportation",
                items: [
                  "CityBee - Car sharing service with electric and regular cars",
                  "Bolt - Ride-sharing app, widely used and reliable",
                  "Bike sharing: CityBee bikes available throughout the city",
                  "Walking-friendly city center with pedestrian zones"
                ]
              },
              {
                title: "Key Transport Hubs",
                items: [
                  "Vilnius Central Station - Main railway station and bus terminal",
                  "Vilnius Airport - 7km from city center, bus connections available",
                  "Cathedral Square - Central bus stop for many city routes",
                  "Lukiškės Square - Major transport interchange point"
                ]
              }
            ],
            links: [
              { text: "Route Planning", href: "https://www.stops.lt" },
              { text: "CityBee", href: "https://www.citybee.lt" },
              { text: "Bolt", href: "https://bolt.eu" }
            ]
          },
          {
            title: "Essential Services",
            icon: "Wifi",
            infoSections: [
              {
                title: "Internet & Mobile",
                items: [
                  "Telia - Largest telecom provider with good coverage",
                  "Bite - Competitive plans and good customer service",
                  "Tele2 - Budget-friendly options with decent coverage",
                  "Free WiFi available in most cafes, malls, and public spaces"
                ]
              },
              {
                title: "Banking",
                items: [
                  "SEB - International bank with English-speaking services",
                  "Swedbank - Popular choice for residents and businesses",
                  "Luminor - Modern digital banking with good mobile app",
                  "Revolut - Digital bank popular among expats"
                ]
              },
              {
                title: "Healthcare",
                items: [
                  "European Health Insurance Card accepted for EU citizens",
                  "Private clinics: Northway, Affidea, Baltic-American Medical",
                  "Emergency number: 112 for all emergency services",
                  "Pharmacies (vaistinės) open late include Camelia and Eurovaistinė"
                ]
              }
            ],
            links: [
              { text: "Telia", href: "https://www.telia.lt" },
              { text: "SEB Bank", href: "https://www.seb.lt" },
              { text: "Northway Medical", href: "https://www.northway.lt" }
            ]
          }
        ]
      },
      {
        id: "utena",
        name: "Utena",
        country: "Lithuania",
        description: "Peaceful lakeside city perfect for nature lovers and quiet living",
        population: "27,000",
        highlights: ["Beautiful Lakes", "Aukštaitija National Park", "Peaceful Environment", "Lower Living Costs"],
        icon: "/src/assets/utena-icon.png",
        path: "/utena",
        sections: [
          {
            title: "Find Your Home",
            icon: "Home",
            defaultExpanded: true,
            infoSections: [
              {
                title: "Popular Areas",
                items: [
                  "City Center - Close to shops, restaurants, and public services",
                  "Lakeside Districts - Peaceful areas near Utena Lake with beautiful views",
                  "Aukštakalnis - Elevated residential area with panoramic city views",
                  "Industrial Zone - Budget-friendly housing near employment centers"
                ]
              },
              {
                title: "Housing Platforms",
                items: [
                  "Aruodas.lt - Main platform with Utena listings",
                  "Skelbiu.lt - Local classified ads with good regional coverage",
                  "Local Facebook groups: 'Utenos skelbimų lenta'",
                  "Direct contact with local real estate agents"
                ]
              },
              {
                title: "Cost of Living",
                items: [
                  "Average rent: €200-400 for 1-2 bedroom apartments",
                  "House rental: €300-600 per month depending on location",
                  "Utilities typically €50-100/month (heating, water, internet)",
                  "Property prices significantly lower than Vilnius"
                ]
              }
            ],
            links: [
              { text: "Aruodas.lt", href: "https://www.aruodas.lt" },
              { text: "Skelbiu.lt", href: "https://www.skelbiu.lt" }
            ]
          },
          {
            title: "Food & Dining",
            icon: "UtensilsCrossed",
            infoSections: [
              {
                title: "Grocery Stores",
                items: [
                  "Maxima - Main supermarket chain with multiple locations",
                  "Norfa - Local chain popular with residents",
                  "IKI - Budget-friendly option with good selection",
                  "Local markets on Wednesday and Saturday mornings"
                ]
              },
              {
                title: "Local Specialties",
                items: [
                  "Fresh fish from local lakes - pike, perch, and bream",
                  "Wild mushrooms and berries in season",
                  "Local honey and dairy products from nearby farms",
                  "Traditional Lithuanian bread from local bakeries"
                ]
              },
              {
                title: "Restaurants & Cafes",
                items: [
                  "Utenos Alaus Darykla - Local brewery with traditional food",
                  "Senoji Kibininė - Traditional kibinai and local dishes",
                  "Kavos Akademija - Cozy cafe with excellent coffee",
                  "Ežero Terasa - Lakeside dining with scenic views"
                ]
              },
              {
                title: "Food Shopping Tips",
                items: [
                  "Local farmers markets offer fresh produce at lower prices",
                  "Seasonal foods are abundant and affordable",
                  "Many residents grow their own vegetables",
                  "Traditional Lithuanian preserved foods available year-round"
                ]
              }
            ],
            links: [
              { text: "Utenos Brewery", href: "https://www.utenos-alus.lt" }
            ]
          },
          {
            title: "Getting Around",
            icon: "Bus",
            infoSections: [
              {
                title: "Public Transportation",
                items: [
                  "City buses: €0.60 per ride, covers most residential areas",
                  "Walking is common - city center easily accessible on foot",
                  "Bicycle-friendly with dedicated paths and bike parking",
                  "Regional buses connect to Vilnius, Panevėžys, and other cities"
                ]
              },
              {
                title: "Intercity Travel",
                items: [
                  "Bus to Vilnius: €8-12, approximately 2 hours journey",
                  "Regular connections to Panevėžys and Kaunas",
                  "Train service available to major Lithuanian cities",
                  "Car rental available for exploring Aukštaitija National Park"
                ]
              },
              {
                title: "Local Transportation",
                items: [
                  "Many residents use bicycles for daily commuting",
                  "Taxi services available via phone booking",
                  "Car sharing less common but private car ownership high",
                  "Walking paths around lakes popular for recreation"
                ]
              },
              {
                title: "Getting to Utena",
                items: [
                  "From Vilnius Airport: Bus to city center, then regional bus",
                  "Direct bus from Vilnius Bus Station multiple times daily",
                  "By car: 2-hour drive from Vilnius via A14 highway",
                  "Train connections through Panevėžys junction"
                ]
              }
            ],
            links: [
              { text: "Bus Tickets", href: "https://www.autobusubilietai.lt" }
            ]
          },
          {
            title: "Nature & Recreation",
            icon: "MapPin",
            infoSections: [
              {
                title: "Aukštaitija National Park",
                items: [
                  "Lithuania's oldest national park, just outside the city",
                  "Over 100 lakes perfect for swimming and fishing",
                  "Hiking trails through pristine forests and wetlands",
                  "Traditional wooden architecture and ethnographic villages"
                ]
              },
              {
                title: "Lakes & Water Activities",
                items: [
                  "Lake Utena - city's main lake with beach and recreation areas",
                  "Swimming areas with facilities during summer months",
                  "Fishing permits available for numerous lakes",
                  "Kayaking and canoeing popular on interconnected waterways"
                ]
              },
              {
                title: "Outdoor Activities",
                items: [
                  "Extensive forest trails for hiking and mushroom picking",
                  "Cross-country skiing in winter months",
                  "Cycling paths throughout the city and surrounding areas",
                  "Bird watching in wetland areas and nature reserves"
                ]
              },
              {
                title: "Cultural Sites",
                items: [
                  "Utena Regional Museum with local history exhibitions",
                  "Traditional craft workshops and pottery studios",
                  "Annual folk festivals and cultural events",
                  "Historical churches and architectural monuments"
                ]
              }
            ],
            links: [
              { text: "National Park", href: "https://www.anp.lt" },
              { text: "City Website", href: "https://www.utena.lt" }
            ]
          }
        ]
      }
    ];
  }

  readItems(): Item[] {
    try {
      const data = fs.readFileSync(this.itemsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading items file:', error);
      const initialData = this.getInitialItemsData();
      this.writeItems(initialData);
      return initialData;
    }
  }

  writeItems(items: Item[]): void {
    try {
      fs.writeFileSync(this.itemsFile, JSON.stringify(items, null, 2));
    } catch (error) {
      console.error('Error writing items file:', error);
      throw error;
    }
  }

  readCities(): City[] {
    try {
      const data = fs.readFileSync(this.citiesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading cities file:', error);
      const initialData = this.getInitialCitiesData();
      this.writeCities(initialData);
      return initialData;
    }
  }

  writeCities(cities: City[]): void {
    try {
      fs.writeFileSync(this.citiesFile, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing cities file:', error);
      throw error;
    }
  }

  // Helper methods for common operations
  getAllItems(): Item[] {
    return this.readItems();
  }

  getItemById(id: string): Item | undefined {
    const items = this.readItems();
    return items.find(item => item.id === id);
  }

  addItem(item: Omit<Item, 'id' | 'createdAt' | 'completed'>): Item {
    const items = this.readItems();
    const newItem: Item = {
      id: (items.length + 1).toString(),
      title: item.title,
      description: item.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    this.writeItems(items);
    return newItem;
  }

  updateItem(id: string, updates: Partial<Pick<Item, 'title' | 'description' | 'completed'>>): Item | null {
    const items = this.readItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }
    
    items[itemIndex] = {
      ...items[itemIndex],
      ...updates
    };
    
    this.writeItems(items);
    return items[itemIndex];
  }

  deleteItem(id: string): Item | null {
    const items = this.readItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }
    
    const deletedItem = items.splice(itemIndex, 1)[0];
    this.writeItems(items);
    return deletedItem;
  }

  // Helper methods for cities
  getAllCities(): City[] {
    return this.readCities();
  }

  getCityById(id: string): City | undefined {
    const cities = this.readCities();
    return cities.find(city => city.id === id);
  }

  addCity(city: Omit<City, 'id'>): City {
    const cities = this.readCities();
    const newCity: City = {
      id: city.name.toLowerCase().replace(/\s+/g, '-'),
      ...city
    };
    
    cities.push(newCity);
    this.writeCities(cities);
    return newCity;
  }

  updateCity(id: string, updates: Partial<Omit<City, 'id'>>): City | null {
    const cities = this.readCities();
    const cityIndex = cities.findIndex(city => city.id === id);
    
    if (cityIndex === -1) {
      return null;
    }
    
    cities[cityIndex] = {
      ...cities[cityIndex],
      ...updates
    };
    
    this.writeCities(cities);
    return cities[cityIndex];
  }

  deleteCity(id: string): City | null {
    const cities = this.readCities();
    const cityIndex = cities.findIndex(city => city.id === id);
    
    if (cityIndex === -1) {
      return null;
    }
    
    const deletedCity = cities.splice(cityIndex, 1)[0];
    this.writeCities(cities);
    return deletedCity;
  }
}

// Export a singleton instance
export const dataStorage = new DataStorage(); 