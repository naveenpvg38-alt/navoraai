const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'navora.db');
const db = new Database(dbPath);

// Enable foreign keys and WAL mode for reliability and performance
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Initialize database schema strictly conforming to Section 17
function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS preferences (
      preference_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      mood TEXT,
      interests TEXT,
      budget TEXT,
      duration TEXT,
      start_time TEXT,
      trip_type TEXT,
      people_count INTEGER DEFAULT 1,
      transport TEXT,
      location TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS plans (
      plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      estimated_cost TEXT,
      duration TEXT,
      match_score INTEGER,
      route_info TEXT,
      why_matched TEXT,
      mood TEXT,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS plan_items (
      item_id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id INTEGER NOT NULL,
      place_name TEXT NOT NULL,
      activity TEXT,
      start_time TEXT,
      end_time TEXT,
      travel_time TEXT,
      estimated_cost TEXT,
      latitude REAL,
      longitude REAL,
      category TEXT,
      insider_tip TEXT,
      FOREIGN KEY (plan_id) REFERENCES plans(plan_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favourites (
      favourite_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, plan_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (plan_id) REFERENCES plans(plan_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS completed_plans (
      completed_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan_id INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, plan_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (plan_id) REFERENCES plans(plan_id) ON DELETE CASCADE
    );
  `);

  // Seed default demo user for instant evaluation
  const demoEmail = 'demo@navora.ai';
  const existingUser = db.prepare('SELECT user_id FROM users WHERE email = ?').get(demoEmail);

  if (!existingUser) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('password123', salt);
    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `).run('Alex Rivera', demoEmail, passwordHash);

    const demoUserId = result.lastInsertRowid;

    // Default user preference
    db.prepare(`
      INSERT INTO preferences (user_id, mood, interests, budget, duration, start_time, trip_type, people_count, transport, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      demoUserId,
      'Adventurous',
      'Art & Culture, Cafes, Hidden Gems',
      'Moderate ($$)',
      'Half Day (4-5h)',
      '10:30 AM',
      'Friends',
      3,
      'Metro / Public Transit',
      'Bengaluru, Karnataka'
    );

    // Seed an initial sample outing plan
    const samplePlan = db.prepare(`
      INSERT INTO plans (user_id, title, description, estimated_cost, duration, match_score, route_info, why_matched, mood, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      demoUserId,
      'Artistic Heritage & Craft Coffee Trail',
      'A curated cultural escape featuring premier contemporary art, artisanal pour-overs, and a historic botanical twilight stroll.',
      '$35 - $50 total',
      '4.5 Hours',
      98,
      'Metro Purple Line + 10 min scenic walk',
      'Tailored for an Adventurous mood with strong interests in Art and Cafes, keeping comfortable within a moderate budget for 3 people.',
      'Adventurous',
      'Bengaluru, Karnataka'
    );

    const samplePlanId = samplePlan.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO plan_items (plan_id, place_name, activity, start_time, end_time, travel_time, estimated_cost, latitude, longitude, category, insider_tip)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertItem.run(
      samplePlanId,
      'National Gallery of Modern Art (NGMA)',
      'Explore colonial heritage architecture and modern Indian master sculptures in the garden gallery.',
      '10:30 AM',
      '12:00 PM',
      'Start Point',
      '$6 / person',
      12.9892,
      77.5878,
      'Art & Culture',
      'Check out the open-air sculpture courtyard behind the heritage mansion for quiet photo ops.'
    );

    insertItem.run(
      samplePlanId,
      'Third Wave Coffee Roasters (Lavelle Rd)',
      'Enjoy signature cold brews, flaky almond croissants, and artisanal single-origin pour-overs.',
      '12:20 PM',
      '01:30 PM',
      '20 mins via Metro / Walk',
      '$12 / person',
      12.9719,
      77.5996,
      'Cafes & Dining',
      'Grab a seat on the second-floor terrace overlooking the tree-canopied avenue.'
    );

    insertItem.run(
      samplePlanId,
      'Cubbon Park & Bamboo Grove Trail',
      'A peaceful nature and heritage canopy walk through 300 acres of green paradise right in the city center.',
      '01:45 PM',
      '03:00 PM',
      '15 mins walk',
      'Free ($0)',
      12.9763,
      77.5929,
      'Scenic Outdoors',
      'The bamboo pavilion near Queen Victoria statue has the best shade during early afternoons.'
    );

    // Seed favourite
    db.prepare(`
      INSERT INTO favourites (user_id, plan_id)
      VALUES (?, ?)
    `).run(demoUserId, samplePlanId);
  }
}

initializeDatabase();

module.exports = db;
