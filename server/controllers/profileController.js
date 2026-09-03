const db = require('../database');

// GET /api/profile (Authenticated)
exports.getProfile = (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = db.prepare('SELECT user_id, name, email, created_at FROM users WHERE user_id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const preferences = db.prepare('SELECT * FROM preferences WHERE user_id = ?').get(userId);

    const totalPlans = db.prepare('SELECT COUNT(*) as count FROM plans WHERE user_id = ?').get(userId).count;
    const totalFavourites = db.prepare('SELECT COUNT(*) as count FROM favourites WHERE user_id = ?').get(userId).count;
    const totalCompleted = db.prepare('SELECT COUNT(*) as count FROM completed_plans WHERE user_id = ?').get(userId).count;

    return res.json({
      user,
      preferences: preferences || null,
      stats: {
        total_plans: totalPlans,
        total_favourites: totalFavourites,
        total_completed: totalCompleted
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ error: 'Failed to retrieve profile information.' });
  }
};

// PUT /api/profile (Authenticated)
exports.updateProfile = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { name, preferences } = req.body;

    if (name && name.trim()) {
      db.prepare('UPDATE users SET name = ? WHERE user_id = ?').run(name.trim(), userId);
    }

    if (preferences) {
      const interestsStr = Array.isArray(preferences.interests)
        ? preferences.interests.join(', ')
        : preferences.interests || '';

      const existingPref = db.prepare('SELECT preference_id FROM preferences WHERE user_id = ?').get(userId);

      if (existingPref) {
        db.prepare(`
          UPDATE preferences
          SET mood = ?, interests = ?, budget = ?, duration = ?, start_time = ?, trip_type = ?, people_count = ?, transport = ?, location = ?, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).run(
          preferences.mood,
          interestsStr,
          preferences.budget,
          preferences.duration,
          preferences.start_time,
          preferences.trip_type,
          preferences.people_count,
          preferences.transport,
          preferences.location,
          userId
        );
      } else {
        db.prepare(`
          INSERT INTO preferences (user_id, mood, interests, budget, duration, start_time, trip_type, people_count, transport, location)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          userId,
          preferences.mood,
          interestsStr,
          preferences.budget,
          preferences.duration,
          preferences.start_time,
          preferences.trip_type,
          preferences.people_count,
          preferences.transport,
          preferences.location
        );
      }
    }

    const updatedUser = db.prepare('SELECT user_id, name, email, created_at FROM users WHERE user_id = ?').get(userId);
    const updatedPreferences = db.prepare('SELECT * FROM preferences WHERE user_id = ?').get(userId);

    return res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
      preferences: updatedPreferences
    });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
};
