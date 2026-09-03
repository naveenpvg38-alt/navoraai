/**
 * Geo and Location Service
 * Handles coordinate resolution, city catalogs, distance computation, and travel duration estimation.
 */

// City database with realistic curated POIs
const CITY_DATABASE = {
  'bengaluru': {
    name: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    places: [
      {
        name: 'National Gallery of Modern Art (NGMA)',
        category: 'Art & Culture',
        lat: 12.9892,
        lng: 77.5878,
        costBudget: 3,
        costModerate: 6,
        costLuxury: 10,
        tip: 'Check out the quiet open-air sculpture courtyard behind the heritage mansion.'
      },
      {
        name: 'Third Wave Coffee Roasters (Lavelle Road)',
        category: 'Cafes & Dining',
        lat: 12.9719,
        lng: 77.5996,
        costBudget: 5,
        costModerate: 12,
        costLuxury: 20,
        tip: 'Second-floor terrace gives the best breeze and view over tree-lined Lavelle Road.'
      },
      {
        name: 'Cubbon Park Botanical Canopy',
        category: 'Scenic Outdoors',
        lat: 12.9763,
        lng: 77.5929,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 5,
        tip: 'Head towards the bamboo pavilion near the bandstand for the coolest shade.'
      },
      {
        name: 'Blossom Book House & Church Street Arcade',
        category: 'Hidden Gems',
        lat: 12.9752,
        lng: 77.6062,
        costBudget: 4,
        costModerate: 15,
        costLuxury: 30,
        tip: 'Browse the rare poetry and vintage graphic novel stacks on the third floor.'
      },
      {
        name: 'Bangalore Palace & Royal Courtyard',
        category: 'Heritage & Sightseeing',
        lat: 12.9988,
        lng: 77.5921,
        costBudget: 6,
        costModerate: 12,
        costLuxury: 25,
        tip: 'Audio guides are included with entry; Tudor-style turrets make great backdrops.'
      },
      {
        name: 'The Permit Room & Gastrobar',
        category: 'Live Music & Nightlife',
        lat: 12.9698,
        lng: 77.6041,
        costBudget: 12,
        costModerate: 25,
        costLuxury: 50,
        tip: 'Try their South Indian cocktail infusions with curry leaf and roasted chili.'
      },
      {
        name: 'Lalbagh Glass House & Lotus Lake',
        category: 'Scenic Outdoors',
        lat: 12.9507,
        lng: 77.5848,
        costBudget: 1,
        costModerate: 3,
        costLuxury: 8,
        tip: 'The 3,000-million-year-old Lalbagh Rock offers panoramic views over the skyline.'
      },
      {
        name: 'Toit Brewpub (Indiranagar)',
        category: 'Cafes & Dining',
        lat: 12.9793,
        lng: 77.6405,
        costBudget: 10,
        costModerate: 22,
        costLuxury: 45,
        tip: 'Order the Tin Man witbier with wood-fired sourdough pizzas.'
      },
      {
        name: 'Commercial Street Artisan Market',
        category: 'Shopping & Bazaars',
        lat: 12.9822,
        lng: 77.6083,
        costBudget: 5,
        costModerate: 20,
        costLuxury: 60,
        tip: 'Wander down the narrow jeweler alleys for hand-crafted silver trinkets.'
      }
    ]
  },
  'mumbai': {
    name: 'Mumbai',
    lat: 18.9220,
    lng: 72.8347,
    places: [
      {
        name: 'Kala Ghoda Art Precinct & Jehangir Gallery',
        category: 'Art & Culture',
        lat: 18.9282,
        lng: 72.8315,
        costBudget: 0,
        costModerate: 5,
        costLuxury: 12,
        tip: 'Look for street pavement artists sketching live portraits.'
      },
      {
        name: 'Subko Specialty Coffee & Bakehouse (Bandra)',
        category: 'Cafes & Dining',
        lat: 19.0566,
        lng: 72.8310,
        costBudget: 6,
        costModerate: 14,
        costLuxury: 24,
        tip: 'Order the sourdough croissant toast and single-origin South Indian roast.'
      },
      {
        name: 'Marine Drive & Sunset Promenade',
        category: 'Scenic Outdoors',
        lat: 18.9438,
        lng: 72.8232,
        costBudget: 0,
        costModerate: 2,
        costLuxury: 8,
        tip: 'Sit near the tetrapods between 5:30 PM and 6:30 PM for sunset vibes.'
      },
      {
        name: 'Colaba Causeway Curio Trail',
        category: 'Shopping & Bazaars',
        lat: 18.9198,
        lng: 72.8312,
        costBudget: 5,
        costModerate: 18,
        costLuxury: 45,
        tip: 'Stop by vintage brass antique shops behind Leopold Cafe.'
      },
      {
        name: 'Gateway of India & Apollo Bunder Harbour',
        category: 'Heritage & Sightseeing',
        lat: 18.9220,
        lng: 72.8347,
        costBudget: 0,
        costModerate: 4,
        costLuxury: 15,
        tip: 'Take a quick 30-minute heritage harbor boat ride around sunset.'
      }
    ]
  },
  'delhi': {
    name: 'Delhi',
    lat: 28.6139,
    lng: 77.2090,
    places: [
      {
        name: 'Lodhi Art District & Open-Air Murals',
        category: 'Art & Culture',
        lat: 28.5878,
        lng: 77.2274,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 5,
        tip: 'Over 50 massive street murals painted by international street artists.'
      },
      {
        name: 'Sunder Nursery Heritage Gardens & Lake',
        category: 'Scenic Outdoors',
        lat: 28.5933,
        lng: 77.2458,
        costBudget: 2,
        costModerate: 5,
        costLuxury: 12,
        tip: 'Grab artisanal ice cream near the restored Mughal water channels.'
      },
      {
        name: 'Hauz Khas Village & Lake Ruins',
        category: 'Heritage & Sightseeing',
        lat: 28.5494,
        lng: 77.1994,
        costBudget: 0,
        costModerate: 10,
        costLuxury: 30,
        tip: 'Sunset from the 14th-century madrasa balcony overlooking the lake is unforgettable.'
      },
      {
        name: 'Café Lota at National Crafts Museum',
        category: 'Cafes & Dining',
        lat: 28.6144,
        lng: 77.2422,
        costBudget: 8,
        costModerate: 18,
        costLuxury: 35,
        tip: 'Taste their Palak Patta Chaat and apple jalebis with coconut rabri.'
      },
      {
        name: 'Dilli Haat Crafts & Food Bazaars',
        category: 'Shopping & Bazaars',
        lat: 28.5732,
        lng: 77.2084,
        costBudget: 3,
        costModerate: 15,
        costLuxury: 40,
        tip: 'Don’t miss the momos and fruit beer at the Sikkim stall.'
      }
    ]
  },
  'new york': {
    name: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    places: [
      {
        name: 'The High Line & Hudson Yards View',
        category: 'Scenic Outdoors',
        lat: 40.7480,
        lng: -74.0048,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 10,
        tip: 'Enter at Gansevoort Street and walk north toward the Vessel for skyline views.'
      },
      {
        name: 'Chelsea Market Food Hall & Artisans',
        category: 'Cafes & Dining',
        lat: 40.7424,
        lng: -74.0061,
        costBudget: 12,
        costModerate: 25,
        costLuxury: 60,
        tip: 'Grab tacos from Los Tacos No. 1 and freshly baked brownies from Fat Witch.'
      },
      {
        name: 'Whitney Museum of American Art',
        category: 'Art & Culture',
        lat: 40.7396,
        lng: -74.0089,
        costBudget: 15,
        costModerate: 25,
        costLuxury: 40,
        tip: 'Step out onto the 8th floor rooftop terraces for views of the Hudson River.'
      },
      {
        name: 'Washington Square Park & Village Jazz',
        category: 'Live Music & Nightlife',
        lat: 40.7308,
        lng: -73.9973,
        costBudget: 0,
        costModerate: 15,
        costLuxury: 45,
        tip: 'Catch impromptu street piano performers under the marble arch.'
      }
    ]
  },
  'paris': {
    name: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    places: [
      {
        name: 'Jardin du Luxembourg & Medici Fountain',
        category: 'Scenic Outdoors',
        lat: 48.8462,
        lng: 2.3371,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 8,
        tip: 'Rent vintage wooden sailboats to float on the grand octagonal pond.'
      },
      {
        name: 'Shakespeare and Company & Seine Quayside',
        category: 'Hidden Gems',
        lat: 48.8525,
        lng: 2.3471,
        costBudget: 0,
        costModerate: 15,
        costLuxury: 35,
        tip: 'Find the reading library upstairs with views of Notre-Dame Cathedral.'
      },
      {
        name: 'Le Marais Historic Courtyards & Patisseries',
        category: 'Cafes & Dining',
        lat: 48.8575,
        lng: 2.3622,
        costBudget: 8,
        costModerate: 20,
        costLuxury: 50,
        tip: 'Savor pistachio escargot pastries from Du Pain et des Idées.'
      },
      {
        name: 'Place des Vosges & Victor Hugo Residence',
        category: 'Heritage & Sightseeing',
        lat: 48.8554,
        lng: 2.3654,
        costBudget: 0,
        costModerate: 8,
        costLuxury: 20,
        tip: 'The oldest planned square in Paris with arched terracotta arcades.'
      }
    ]
  },
  'tokyo': {
    name: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    places: [
      {
        name: 'Meiji Jingu Forest Shrine',
        category: 'Heritage & Sightseeing',
        lat: 35.6764,
        lng: 139.6993,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 10,
        tip: 'Walk through the 100-year-old man-made sacred evergreen forest.'
      },
      {
        name: 'Omotesando Architectural Cafe Lane',
        category: 'Cafes & Dining',
        lat: 35.6652,
        lng: 139.7123,
        costBudget: 7,
        costModerate: 18,
        costLuxury: 45,
        tip: 'Sip matcha lattes in minimalist glass-fronted courtyard cafes.'
      },
      {
        name: 'Nezu Museum & Japanese Moss Garden',
        category: 'Art & Culture',
        lat: 35.6625,
        lng: 139.7188,
        costBudget: 8,
        costModerate: 14,
        costLuxury: 25,
        tip: 'The bamboo walkway entrance alone is one of Tokyo’s most serene spots.'
      },
      {
        name: 'Shibuya Sky & Sunset Observation Deck',
        category: 'Scenic Outdoors',
        lat: 35.6580,
        lng: 139.7016,
        costBudget: 15,
        costModerate: 22,
        costLuxury: 40,
        tip: 'Book the 360-degree glass corner hammock spot around 5:30 PM.'
      }
    ]
  },
  'london': {
    name: 'London',
    lat: 51.5074,
    lng: -0.1278,
    places: [
      {
        name: 'Southbank Riverside Walk & Tate Modern',
        category: 'Art & Culture',
        lat: 51.5076,
        lng: -0.0994,
        costBudget: 0,
        costModerate: 8,
        costLuxury: 20,
        tip: 'Visit the Turbine Hall and take the elevator to the 10th-floor viewing terrace.'
      },
      {
        name: 'Borough Market Street Gastronomy',
        category: 'Cafes & Dining',
        lat: 51.5055,
        lng: -0.0910,
        costBudget: 10,
        costModerate: 22,
        costLuxury: 50,
        tip: 'Try hot melted raclette over roasted potatoes and freshly baked sourdough doughnuts.'
      },
      {
        name: 'St. Dunstan in the East Ruined Church Garden',
        category: 'Hidden Gems',
        lat: 51.5097,
        lng: -0.0828,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 5,
        tip: 'A secret gothic ruin overgrown with ivy and climbing hydrangeas in the middle of the city.'
      }
    ]
  }
};

// Haversine formula to compute great-circle distance between coordinates in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate travel duration string and minutes
function calculateTransitInfo(distKm, transportMode) {
  const mode = (transportMode || 'Public Transit').toLowerCase();
  let speedKmH = 20; // default transit
  let modeName = 'Public Transit';

  if (mode.includes('walk')) {
    speedKmH = 4.5;
    modeName = 'Scenic Walk';
  } else if (mode.includes('bike') || mode.includes('cycle') || mode.includes('scooter')) {
    speedKmH = 14;
    modeName = 'Bicycle Ride';
  } else if (mode.includes('car') || mode.includes('cab') || mode.includes('drive')) {
    speedKmH = 30;
    modeName = 'Car / Cab';
  } else {
    speedKmH = 22;
    modeName = 'Metro / Transit';
  }

  const hours = distKm / speedKmH;
  const rawMinutes = Math.max(5, Math.round(hours * 60));
  const roundedMinutes = Math.ceil(rawMinutes / 5) * 5; // round to nearest 5 mins

  return {
    minutes: roundedMinutes,
    text: `${roundedMinutes} mins via ${modeName} (${distKm.toFixed(1)} km)`
  };
}

// Find closest matched city or generate synthetic localized POIs
function resolveLocationCatalog(locationQuery) {
  const clean = (locationQuery || '').trim().toLowerCase();

  for (const [key, city] of Object.entries(CITY_DATABASE)) {
    if (clean.includes(key) || key.includes(clean)) {
      return city;
    }
  }

  // Default fallback city if not found, with adapted naming
  const cityName = locationQuery && locationQuery.length > 2 ? locationQuery : 'Downtown Central';
  return {
    name: cityName,
    lat: 12.9716,
    lng: 77.5946,
    places: [
      {
        name: `${cityName} Promenade & Heritage Square`,
        category: 'Scenic Outdoors',
        lat: 12.9720,
        lng: 77.5950,
        costBudget: 0,
        costModerate: 0,
        costLuxury: 5,
        tip: 'Perfect meeting spot with open paved courtyards and fountain displays.'
      },
      {
        name: `The Roast & Bean Artisan Cafe`,
        category: 'Cafes & Dining',
        lat: 12.9765,
        lng: 77.5990,
        costBudget: 6,
        costModerate: 14,
        costLuxury: 25,
        tip: 'Specialty pour-overs with house-made artisanal pastries.'
      },
      {
        name: `${cityName} Contemporary Art Pavilion`,
        category: 'Art & Culture',
        lat: 12.9810,
        lng: 77.5910,
        costBudget: 3,
        costModerate: 8,
        costLuxury: 18,
        tip: 'Check out the interactive media installations on the mezzanine floor.'
      },
      {
        name: 'Old Town Bazaar & Craft Passageway',
        category: 'Hidden Gems',
        lat: 12.9850,
        lng: 77.6020,
        costBudget: 4,
        costModerate: 16,
        costLuxury: 40,
        tip: 'Explore the narrow side alleys for handmade leather goods and vintage prints.'
      },
      {
        name: 'Skyline Terrace & Sunset Lounge',
        category: 'Live Music & Nightlife',
        lat: 12.9700,
        lng: 77.6080,
        costBudget: 12,
        costModerate: 25,
        costLuxury: 55,
        tip: 'Arrive 20 minutes before golden hour to secure an edge-view high table.'
      }
    ]
  };
}

module.exports = {
  CITY_DATABASE,
  calculateDistanceKm,
  calculateTransitInfo,
  resolveLocationCatalog
};
