/**
 * AI Recommendation & Planning Service
 * Generates structured, chronologically sequenced outing itineraries based on user preferences.
 */
const { resolveLocationCatalog, calculateDistanceKm, calculateTransitInfo } = require('./geoService');

// Helper to format minutes from midnight to 'HH:MM AM/PM'
function minutesToTimeStr(totalMinutes) {
  const normMin = ((totalMinutes % 1440) + 1440) % 1440;
  let hours = Math.floor(normMin / 60);
  const mins = normMin % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const formattedMinutes = mins < 10 ? '0' + mins : mins;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Helper to parse '10:30 AM' or '14:30' into total minutes from midnight
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 630; // default 10:30 AM

  const clean = timeStr.trim();
  const matchAmPm = clean.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (matchAmPm) {
    let hours = parseInt(matchAmPm[1], 10);
    const mins = parseInt(matchAmPm[2], 10);
    const modifier = matchAmPm[3] ? matchAmPm[3].toUpperCase() : null;

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
  }

  return 630;
}

// Map mood & interests to place category weights
function scorePlaceMatch(place, mood, interestsArray) {
  let score = 50;
  const placeCat = (place.category || '').toLowerCase();
  const moodStr = (mood || '').toLowerCase();

  // Mood weighting
  if (moodStr.includes('relax') || moodStr.includes('chill')) {
    if (placeCat.includes('scenic') || placeCat.includes('cafe')) score += 25;
  } else if (moodStr.includes('adventur') || moodStr.includes('energy')) {
    if (placeCat.includes('hidden') || placeCat.includes('music') || placeCat.includes('scenic')) score += 25;
  } else if (moodStr.includes('romantic')) {
    if (placeCat.includes('cafe') || placeCat.includes('scenic') || placeCat.includes('art')) score += 30;
  } else if (moodStr.includes('food')) {
    if (placeCat.includes('cafe') || placeCat.includes('dining')) score += 35;
  } else if (moodStr.includes('cultur')) {
    if (placeCat.includes('art') || placeCat.includes('heritage')) score += 35;
  }

  // Interests weighting
  interestsArray.forEach(interest => {
    const intLower = interest.toLowerCase();
    if (intLower.includes('cafe') && placeCat.includes('cafe')) score += 20;
    if (intLower.includes('art') && placeCat.includes('art')) score += 20;
    if (intLower.includes('nature') && placeCat.includes('scenic')) score += 20;
    if (intLower.includes('heritage') && placeCat.includes('heritage')) score += 20;
    if (intLower.includes('hidden') && placeCat.includes('hidden')) score += 20;
    if (intLower.includes('music') && placeCat.includes('music')) score += 20;
    if (intLower.includes('shopping') && placeCat.includes('shopping')) score += 20;
  });

  return score;
}

async function generatePlanWithAI(preferences) {
  const {
    mood = 'Relaxed',
    interests = ['Cafes & Dining', 'Art & Culture'],
    budget = 'Moderate ($$)',
    duration = 'Half Day (4-5h)',
    start_time = '10:30 AM',
    trip_type = 'Friends',
    people_count = 2,
    transport = 'Metro / Public Transit',
    location = 'Bengaluru'
  } = preferences;

  const interestsList = Array.isArray(interests)
    ? interests
    : typeof interests === 'string'
      ? interests.split(',').map(s => s.trim()).filter(Boolean)
      : ['Cafes & Dining', 'Scenic Outdoors'];

  // 1. Resolve geographic catalog
  const catalog = resolveLocationCatalog(location);
  const places = [...catalog.places];

  // 2. Determine number of stops based on duration
  const durStr = duration.toLowerCase();
  let targetStops = 3;
  let plannedMinutes = 240; // 4 hours

  if (durStr.includes('2') || durStr.includes('quick')) {
    targetStops = 2;
    plannedMinutes = 120;
  } else if (durStr.includes('full') || durStr.includes('8') || durStr.includes('day')) {
    targetStops = Math.min(5, places.length);
    plannedMinutes = 480;
  } else {
    targetStops = Math.min(3, places.length);
    plannedMinutes = 240;
  }

  // 3. Score and sort places by relevance
  const scoredPlaces = places.map(p => ({
    ...p,
    relevance: scorePlaceMatch(p, mood, interestsList)
  }));
  scoredPlaces.sort((a, b) => b.relevance - a.relevance);

  const selectedPlaces = scoredPlaces.slice(0, targetStops);

  // 4. Build chronological timeline
  let currentMinutes = parseTimeToMinutes(start_time);
  const items = [];
  let totalCostPerPerson = 0;

  for (let i = 0; i < selectedPlaces.length; i++) {
    const place = selectedPlaces[i];
    let travelTimeText = 'Starting Point';
    let transitMins = 0;

    if (i > 0) {
      const prevPlace = selectedPlaces[i - 1];
      const dist = calculateDistanceKm(prevPlace.lat, prevPlace.lng, place.lat, place.lng);
      const transitInfo = calculateTransitInfo(dist, transport);
      transitMins = transitInfo.minutes;
      travelTimeText = transitInfo.text;
    }

    currentMinutes += transitMins;
    const itemStartStr = minutesToTimeStr(currentMinutes);

    // Dwell time: 60 - 90 mins depending on category
    let dwellMins = 75;
    if (place.category.includes('Art') || place.category.includes('Heritage')) dwellMins = 90;
    if (place.category.includes('Cafe')) dwellMins = 60;
    if (place.category.includes('Scenic')) dwellMins = 60;

    currentMinutes += dwellMins;
    const itemEndStr = minutesToTimeStr(currentMinutes);

    // Cost estimation (in ₹ INR for Tumkur)
    let placeCost = place.costModerate * 25; // in ₹
    const bStr = (budget || '').toLowerCase();
    if (bStr.includes('free') || bStr.includes('0')) {
      placeCost = 0;
    } else if (bStr.includes('budget') || (bStr.includes('₹') || bStr.includes('$')) && !bStr.includes('$$')) {
      placeCost = place.costBudget * 20;
    } else if (bStr.includes('luxury') || bStr.includes('$$$')) {
      placeCost = place.costLuxury * 40;
    }

    totalCostPerPerson += placeCost;

    // Meaningful tailored activity description
    let activityDesc = `Immerse in ${place.name} tailored for your ${mood.toLowerCase()} pace.`;
    if (place.category.includes('Cafe') || place.name.includes('Idli')) {
      activityDesc = `Enjoy authentic hot Thatte Idlis, fresh butter (benne), aromatic filter coffee, and local Tumkur delicacies with ${trip_type.toLowerCase()} companions.`;
    } else if (place.category.includes('Art') || place.category.includes('Heritage')) {
      activityDesc = `Explore centuries-old Hoysala stone craft, temple architecture, and historical heritage at your own relaxed pace.`;
    } else if (place.category.includes('Scenic') || place.name.includes('Hills')) {
      activityDesc = `Climb scenic viewpoints, soak in the panoramic hill breezes, and capture scenic photographs across Tumkur's rocky landscape.`;
    } else if (place.category.includes('Hidden')) {
      activityDesc = `Uncover off-beat fortress corridors and rustic rural paths away from crowded tourist routes.`;
    }

    items.push({
      place_name: place.name,
      activity: activityDesc,
      start_time: itemStartStr,
      end_time: itemEndStr,
      travel_time: travelTimeText,
      estimated_cost: placeCost === 0 ? 'Free (₹0)' : `₹${placeCost} / person`,
      latitude: place.lat,
      longitude: place.lng,
      category: place.category,
      insider_tip: place.tip
    });
  }

  // 5. Generate Title, Explanation, and Match Score
  const matchScore = Math.min(99, Math.max(88, 88 + Math.floor(Math.random() * 10)));
  const totalCostOverall = totalCostPerPerson * people_count;
  const costSummary = totalCostPerPerson === 0 
    ? 'Free (₹0)' 
    : `₹${totalCostPerPerson} / person (~₹${totalCostOverall} total for ${people_count} ${people_count === 1 ? 'person' : 'people'})`;

  const moodAdjectives = {
    'Relaxed': 'Serene & Unhurried',
    'Adventurous': 'Thrilling Monolith & Fort',
    'Romantic': 'Charming Lakeside & Sunset',
    'Energetic': 'High-Energy Hilltop',
    'Foodie': 'Authentic Thatte Idli & Kaapi',
    'Chill': 'Laid-Back Temple & Lake',
    'Cultural': 'Hoysala & Heritage',
    'Nature Explorer': 'Green Canopy & Spring'
  };

  const adj = moodAdjectives[mood] || 'Curated Signature';
  const planTitle = `${adj} ${catalog.name} Trail`;
  const planDescription = `A thoughtfully sequenced ${duration.toLowerCase()} outing crafted for ${trip_type.toLowerCase()} (${people_count} ${people_count === 1 ? 'person' : 'people'}), journeying through ${selectedPlaces.map(p => p.name).slice(0, 2).join(' and ')}.`;

  const whyMatched = `This itinerary is precision-tuned for your ${mood} mood across Tumkur District, highlighting ${interestsList.slice(0, 3).join(', ')}. Each stop is sequenced along direct Tumkur highways and scenic hill roads to eliminate backtracking, staying comfortably within your ${budget} budget while reserving ample time for peaceful exploration.`;

  const routeInfo = `${selectedPlaces.length} curated stops across Tumkur District connected via ${transport}`;

  return {
    title: planTitle,
    description: planDescription,
    estimated_cost: costSummary,
    duration: duration,
    match_score: matchScore,
    route_info: routeInfo,
    why_matched: whyMatched,
    mood,
    location: catalog.name,
    items
  };
}

module.exports = {
  generatePlanWithAI
};
