/**
 * Geo and Location Service - Specialized for TUMKUR (Tumakuru) District, Karnataka
 * Covers major taluks: Tumkur, Madhugiri, Kunigal, Koratagere, Gubbi, Sira, Tiptur, Pavagada.
 */

// Comprehensive Curated Catalog of Tumkur District Points of Interest
const TUMKUR_PLACES = [
  {
    name: 'Devarayanadurga (DD Hills) Yoga Narasimha Peak',
    category: 'Scenic Outdoors',
    taluk: 'Tumkur',
    lat: 13.3736,
    lng: 77.2114,
    costBudget: 0,
    costModerate: 5,
    costLuxury: 10,
    tip: 'Arrive before 08:30 AM for misty hill breezes; climb the stone steps to the peak for 360-degree valley views.'
  },
  {
    name: 'Namada Chilume Natural Spring & Deer Sanctuary',
    category: 'Scenic Outdoors',
    taluk: 'Tumkur',
    lat: 13.3444,
    lng: 77.1989,
    costBudget: 1,
    costModerate: 3,
    costLuxury: 6,
    tip: 'Observe the natural perennial rock spring associated with Treta Yuga and stroll through the deer enclosure and medicinal arboretum.'
  },
  {
    name: 'Kyathsandra Iconic Thatte Idli Square',
    category: 'Cafes & Dining',
    taluk: 'Tumkur',
    lat: 13.3106,
    lng: 77.1472,
    costBudget: 2,
    costModerate: 5,
    costLuxury: 12,
    tip: 'Order warm piping Thatte Idli topped with a generous dollop of fresh white butter (benne), spicy red chutney, and authentic filter coffee.'
  },
  {
    name: 'Sree Siddaganga Kshetra & Hill Shrine',
    category: 'Heritage & Sightseeing',
    taluk: 'Tumkur',
    lat: 13.3175,
    lng: 77.1390,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 5,
    tip: 'Pay respects at the revered Dasoha shrine of Dr. Shivakumara Swamiji and walk the serene hillside pathway.'
  },
  {
    name: 'Kaidala Chennakeshava Hoysala Temple',
    category: 'Art & Culture',
    taluk: 'Tumkur',
    lat: 13.2982,
    lng: 77.0863,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 5,
    tip: 'Admire the 6-foot magnificent black chloritic schist idol sculpted by master legend Amarashilpi Jakanachari in his native village.'
  },
  {
    name: 'Amanikere Lake Promenade & Musical Fountain',
    category: 'Scenic Outdoors',
    taluk: 'Tumkur',
    lat: 13.3446,
    lng: 77.1082,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 8,
    tip: 'Stroll the landscaped waterfront walking track during sunset and catch the evening fountain lights.'
  },
  {
    name: 'Madhugiri Monolith Fort & Trekking Pinnacle',
    category: 'Scenic Outdoors',
    taluk: 'Madhugiri',
    lat: 13.6631,
    lng: 77.2144,
    costBudget: 0,
    costModerate: 4,
    costLuxury: 10,
    tip: 'Second largest monolithic rock in all of Asia. Start the trek early morning with water; marvel at the tiered stone bastions built by Raja Hire Gowda.'
  },
  {
    name: 'Markonahalli Siphon Dam & Shimsha Lake (Kunigal)',
    category: 'Scenic Outdoors',
    taluk: 'Kunigal',
    lat: 12.9238,
    lng: 76.9387,
    costBudget: 0,
    costModerate: 3,
    costLuxury: 8,
    tip: 'Unique automatic siphon engineering marvel built by Sir M. Visvesvaraya; peaceful picnic embankments with serene water ripples.'
  },
  {
    name: 'Goravanahalli Mahalakshmi Temple & Thetha Lake',
    category: 'Heritage & Sightseeing',
    taluk: 'Koratagere',
    lat: 13.5283,
    lng: 77.2625,
    costBudget: 0,
    costModerate: 3,
    costLuxury: 8,
    tip: 'Famous pilgrimage shrine nestled beside scenic hillocks and Thetha reservoir.'
  },
  {
    name: 'Channarayana Durga Rock Fortress',
    category: 'Hidden Gems',
    taluk: 'Koratagere',
    lat: 13.5682,
    lng: 77.1995,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 5,
    tip: 'Off-beat medieval stone fort with secret passageways, granaries, and commanding hilltop views of the Tumkur plains.'
  },
  {
    name: 'B.H. Road Tumkur Artisan Coffee & Snacks Trail',
    category: 'Cafes & Dining',
    taluk: 'Tumkur',
    lat: 13.3412,
    lng: 77.1025,
    costBudget: 3,
    costModerate: 8,
    costLuxury: 18,
    tip: 'Savor crispy masala dosas, filter kaapi, and fresh fruit juices at iconic city centers near Ashok Nagar and B.H. Road.'
  },
  {
    name: 'Sira Malik Rehan Tomb & Kasturi Rangappa Fort',
    category: 'Art & Culture',
    taluk: 'Sira',
    lat: 13.7431,
    lng: 76.9038,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 6,
    tip: 'Sublime Indo-Islamic and Nayaka architectural synthesis with stone arches and ornamental stucco plastering.'
  },
  {
    name: 'Gubbi Sri Channabasaveshwara Temple & Heritage Square',
    category: 'Heritage & Sightseeing',
    taluk: 'Gubbi',
    lat: 13.3117,
    lng: 76.9405,
    costBudget: 0,
    costModerate: 2,
    costLuxury: 5,
    tip: 'Historic cultural center with traditional stone pillars and centuries-old car festival heritage.'
  }
];

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
  const mode = (transportMode || 'Two-wheeler / Bike').toLowerCase();
  let speedKmH = 30; // default for Tumkur district roads
  let modeName = 'Bike / Car';

  if (mode.includes('walk')) {
    speedKmH = 4.5;
    modeName = 'Scenic Walk';
  } else if (mode.includes('bike') || mode.includes('cycle') || mode.includes('two-wheeler')) {
    speedKmH = 35;
    modeName = 'Bike / Two-Wheeler';
  } else if (mode.includes('car') || mode.includes('cab') || mode.includes('drive')) {
    speedKmH = 45;
    modeName = 'Car / Cab';
  } else {
    speedKmH = 28;
    modeName = 'KSRTC / Town Bus';
  }

  const hours = distKm / speedKmH;
  const rawMinutes = Math.max(5, Math.round(hours * 60));
  const roundedMinutes = Math.ceil(rawMinutes / 5) * 5;

  return {
    minutes: roundedMinutes,
    text: `${roundedMinutes} mins via ${modeName} (${distKm.toFixed(1)} km)`
  };
}

// Filter or resolve Tumkur places based on sub-location/taluk search
function resolveLocationCatalog(locationQuery) {
  const clean = (locationQuery || '').trim().toLowerCase();

  // If specific taluk or attraction requested, prioritize matching items
  let filtered = TUMKUR_PLACES;
  let subArea = 'Tumkur District';

  if (clean.includes('dd') || clean.includes('devarayana') || clean.includes('hills')) {
    subArea = 'Devarayanadurga (DD Hills), Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.name.includes('Devarayana') || p.name.includes('Namada') || p.name.includes('Kyathsandra') || p.taluk === 'Tumkur');
  } else if (clean.includes('kyath') || clean.includes('idli') || clean.includes('siddaganga')) {
    subArea = 'Kyathsandra & Siddaganga, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.name.includes('Kyathsandra') || p.name.includes('Siddaganga') || p.taluk === 'Tumkur');
  } else if (clean.includes('madhugiri')) {
    subArea = 'Madhugiri Monolith Region, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.taluk === 'Madhugiri' || p.taluk === 'Koratagere' || p.taluk === 'Tumkur');
  } else if (clean.includes('kaidala')) {
    subArea = 'Kaidala Hoysala Precinct, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.name.includes('Kaidala') || p.taluk === 'Tumkur' || p.taluk === 'Gubbi');
  } else if (clean.includes('kunigal') || clean.includes('markona')) {
    subArea = 'Kunigal & Markonahalli, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.taluk === 'Kunigal' || p.taluk === 'Tumkur');
  } else if (clean.includes('sira')) {
    subArea = 'Sira Heritage Precinct, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.taluk === 'Sira' || p.taluk === 'Madhugiri' || p.taluk === 'Tumkur');
  } else if (clean.includes('gubbi')) {
    subArea = 'Gubbi Heritage Region, Tumkur';
    filtered = TUMKUR_PLACES.filter(p => p.taluk === 'Gubbi' || p.taluk === 'Tumkur');
  }

  return {
    name: subArea,
    lat: 13.3392,
    lng: 77.1015,
    places: filtered.length >= 2 ? filtered : TUMKUR_PLACES
  };
}

module.exports = {
  TUMKUR_PLACES,
  calculateDistanceKm,
  calculateTransitInfo,
  resolveLocationCatalog
};
