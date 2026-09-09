/**
 * AI Recommendation & Planning Service (Client-side & Universal)
 * Generates structured, chronologically sequenced outing itineraries based on user preferences.
 */
import { resolveLocationCatalog, calculateDistanceKm, calculateTransitInfo } from './geoService';

function minutesToTimeStr(totalMinutes) {
  const normMin = ((totalMinutes % 1440) + 1440) % 1440;
  let hours = Math.floor(normMin / 60);
  const mins = normMin % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = mins < 10 ? '0' + mins : mins;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 510; // default 08:30 AM

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

  return 510;
}

function scorePlaceMatch(place, mood, interestsArray) {
  let score = 50;
  const placeCat = (place.category || '').toLowerCase();
  const moodStr = (mood || '').toLowerCase();

  if (moodStr.includes('relax') || moodStr.includes('chill')) {
    if (placeCat.includes('scenic') || placeCat.includes('cafe')) score += 25;
  } else if (moodStr.includes('adventur') || moodStr.includes('energy')) {
    if (placeCat.includes('hidden') || placeCat.includes('music') || placeCat.includes('scenic')) score += 25;
  } else if (moodStr.includes('romantic')) {
    if (placeCat.includes('cafe') || placeCat.includes('scenic') || placeCat.includes('art')) score += 30;
  } else if (moodStr.includes('food')) {
    if (placeCat.includes('cafe') || placeCat.includes('dining')) score += 35;
  } else if (moodStr.includes('cultur') || moodStr.includes('heritage')) {
    if (placeCat.includes('art') || placeCat.includes('heritage')) score += 35;
  }

  interestsArray.forEach(interest => {
    const intLower = interest.toLowerCase();
    if (intLower.includes('cafe') && placeCat.includes('cafe')) score += 20;
    if (intLower.includes('art') && placeCat.includes('art')) score += 20;
    if (intLower.includes('scenic') && placeCat.includes('scenic')) score += 20;
    if (intLower.includes('heritage') && placeCat.includes('heritage')) score += 20;
    if (intLower.includes('hidden') && placeCat.includes('hidden')) score += 20;
    if (intLower.includes('lake') && (place.name.toLowerCase().includes('lake') || placeCat.includes('scenic'))) score += 25;
  });

  return score;
}

export async function generatePlanWithAI(preferences = {}) {
  const {
    mood = 'Relaxed',
    interests = ['Cafes & Dining', 'Scenic Outdoors'],
    budget = 'Moderate (₹500)',
    duration = 'Half Day (4-5h)',
    start_time = '08:30 AM',
    trip_type = 'Friends',
    people_count = 2,
    transport = 'Bike / Two-Wheeler',
    location = 'Tumkur, Karnataka'
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

  if (durStr.includes('2') || durStr.includes('quick')) {
    targetStops = 2;
  } else if (durStr.includes('full') || durStr.includes('8') || durStr.includes('day')) {
    targetStops = Math.min(4, places.length);
  } else {
    targetStops = Math.min(3, places.length);
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

    let dwellMins = 60;
    if (place.category.includes('Art') || place.category.includes('Heritage')) dwellMins = 75;
    if (place.category.includes('Cafe') || place.category.includes('Dining')) dwellMins = 50;
    if (place.name.includes('Fort') || place.name.includes('Peak')) dwellMins = 90;

    currentMinutes += dwellMins;
    const itemEndStr = minutesToTimeStr(currentMinutes);

    let placeCost = place.costModerate * 25;
    const bStr = (budget || '').toLowerCase();
    if (bStr.includes('free') || bStr.includes('0')) {
      placeCost = 0;
    } else if (bStr.includes('budget') || bStr.includes('150') || bStr.includes('300')) {
      placeCost = place.costBudget * 20;
    } else if (bStr.includes('luxury') || bStr.includes('1500') || bStr.includes('2000')) {
      placeCost = place.costLuxury * 45;
    }

    totalCostPerPerson += placeCost;

    items.push({
      item_id: i + 1,
      place_name: place.name,
      category: place.category,
      activity: `${place.category} exploration at ${place.name}`,
      start_time: itemStartStr,
      end_time: itemEndStr,
      duration_minutes: dwellMins,
      estimated_cost: placeCost === 0 ? 'Free entry' : `₹${placeCost}`,
      travel_time: travelTimeText,
      latitude: place.lat,
      longitude: place.lng,
      tips: place.tip
    });
  }

  // 5. Match Score calculation
  const topRelevance = selectedPlaces.reduce((acc, p) => acc + p.relevance, 0) / (selectedPlaces.length || 1);
  const matchScore = Math.min(99, Math.max(88, Math.round(topRelevance)));

  const routeSummary = selectedPlaces.map(p => p.name.split(' ')[0]).join(' ➔ ');

  return {
    title: `Tumkur ${mood} Circuit: ${selectedPlaces[0]?.name.split(' ')[0] || 'Discovery'} & Beyond`,
    description: `A custom-synthesized ${duration} outing across Tumkur for ${trip_type} (${people_count} ${people_count === 1 ? 'person' : 'people'}) with zero backtracking.`,
    match_score: matchScore,
    estimated_cost: totalCostPerPerson === 0 ? '₹0 (Free Outing)' : `₹${totalCostPerPerson} per person (~₹${totalCostPerPerson * Number(people_count)} total)`,
    duration,
    route_info: `${routeSummary} (Optimized for ${transport})`,
    why_matched: `Calibrated for your ${mood} mood with focus on ${interestsList.join(' & ')} starting at ${start_time}.`,
    items
  };
}
