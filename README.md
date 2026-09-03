# ✦ NAVORA AI — AI-Powered Personalized Outing Planner
> *“Plan Less. Experience More.”*

An academic project submission for a full-stack, AI-assisted outing and itinerary planning web platform.

---

## 🌟 Key Features

- **✦ Splash & Visual Onboarding:** Animated brand splash screen introducing the platform.
- **🔐 Complete Authentication Flow:** Sign Up, Login, 1-Click Demo Login, secure password hashing (`bcryptjs`), and JWT session tokens.
- **🎯 7-Step Interactive Outing Wizard:**
  1. **Mood:** Relaxed, Adventurous, Romantic, Energetic, Foodie, Chill, Cultural, Nature Explorer.
  2. **Interests:** Cafes & Dining, Art & Culture, Scenic Outdoors, Heritage, Hidden Gems, Nightlife, Shopping.
  3. **Budget:** Free ($0), Budget ($), Moderate ($$), Luxury ($$$).
  4. **Duration & Start Time:** Quick presets (2 Hours, Half Day, Full Day) and start-time scheduler.
  5. **Trip Type & Group Size:** Solo, Couple, Friends, Family, Large Groups with live count controls.
  6. **Transport Mode:** Scenic Walk, Bicycle, Metro / Public Transit, Car / Cab.
  7. **Location & GPS:** One-click HTML5 GPS auto-detection + multi-city catalog.
- **🧠 Dual-Engine AI Recommendation System:**
  - Integrated Gemini API support for dynamic contextual synthesis.
  - Built-in heuristic geographic recommendation engine with Haversine distance calculations and zero external API dependencies.
- **🗺️ Interactive Route Map (Leaflet.js & OpenStreetMap):** Numbered sequence pins, popups, and route polylines.
- **💾 Plan Management (Profile Section):**
  - Save Generated Itineraries
  - Toggle Favourites (❤️)
  - Mark Outings as Completed (✅)
  - Personal Information & Default Preferences editor
  - Export to Print / PDF & Share to clipboard

---

## 🏗️ System Architecture

```
[ Frontend: React 18 + Tailwind CSS + Lucide Icons + Leaflet.js ]
                                │  REST API / JSON
                                ▼
         [ Backend: Express.js API Server (Node.js) ]
          │                    │                     │
          ▼                    ▼                     ▼
 [ SQLite Database ]    [ AI Planner Engine ]   [ Location & Geo Engine ]
 (6 Relational Tables)   (Gemini / Built-in)     (Haversine & OpenStreetMap)
```

---

## 🗄️ Database Schema (SQLite: `server/navora.db`)

Strictly matches **Section 17** of the project specification:

1. **`users`**: `user_id`, `name`, `email`, `password_hash`, `created_at`
2. **`preferences`**: `preference_id`, `user_id`, `mood`, `interests`, `budget`, `duration`, `start_time`, `trip_type`, `people_count`, `transport`, `location`, `updated_at`
3. **`plans`**: `plan_id`, `user_id`, `title`, `description`, `estimated_cost`, `duration`, `match_score`, `route_info`, `why_matched`, `mood`, `location`, `created_at`
4. **`plan_items`**: `item_id`, `plan_id`, `place_name`, `activity`, `start_time`, `end_time`, `travel_time`, `estimated_cost`, `latitude`, `longitude`, `category`, `insider_tip`
5. **`favourites`**: `favourite_id`, `user_id`, `plan_id`, `created_at`
6. **`completed_plans`**: `completed_id`, `user_id`, `plan_id`, `completed_at`

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
# In project root:
npm install

# In client directory:
cd client && npm install && cd ..
```

### 2. Run Development Server
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### 3. Production Build & Run
```bash
npm run build
npm start
```
- Access full app on: `http://localhost:5000`

---

## 🔑 Demo Evaluation Credentials

You can test without signing up by using the **Instant 1-Click Demo Login** button, or using:
- **Email:** `demo@navora.ai`
- **Password:** `password123`

---

## 📡 API Endpoints (Section 34)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT |
| `POST` | `/api/auth/demo-login` | 1-Click academic evaluator login |
| `GET` | `/api/auth/me` | Fetch authenticated user & preferences |
| `POST` | `/api/planner/generate` | Generate AI personalized outing plan |
| `POST` | `/api/plans/save` | Save generated itinerary |
| `GET` | `/api/plans` | List user's saved, favourite, and completed plans |
| `GET` | `/api/plans/:id` | Get specific plan details and stops |
| `DELETE` | `/api/plans/:id` | Delete saved plan |
| `POST` | `/api/plans/:id/favourite` | Toggle favourite status |
| `POST` | `/api/plans/:id/complete` | Toggle completed status |
| `GET` | `/api/profile` | Get user profile stats and preferences |
| `PUT` | `/api/profile` | Update profile and default preferences |
