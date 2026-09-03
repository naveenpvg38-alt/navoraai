const db = require('../database');
const { generatePlanWithAI } = require('../services/aiPlannerService');

// POST /api/planner/generate
exports.generatePlan = async (req, res) => {
  try {
    const preferences = req.body;
    const plan = await generatePlanWithAI(preferences);

    // If user is authenticated, update their preferences table
    if (req.user && req.user.user_id) {
      const interestsStr = Array.isArray(preferences.interests)
        ? preferences.interests.join(', ')
        : preferences.interests || '';

      const existingPref = db.prepare('SELECT preference_id FROM preferences WHERE user_id = ?').get(req.user.user_id);
      if (existingPref) {
        db.prepare(`
          UPDATE preferences
          SET mood = ?, interests = ?, budget = ?, duration = ?, start_time = ?, trip_type = ?, people_count = ?, transport = ?, location = ?, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).run(
          preferences.mood || 'Relaxed',
          interestsStr,
          preferences.budget || 'Moderate ($$)',
          preferences.duration || 'Half Day (4-5h)',
          preferences.start_time || '10:30 AM',
          preferences.trip_type || 'Friends',
          preferences.people_count || 2,
          preferences.transport || 'Metro / Public Transit',
          preferences.location || 'Bengaluru',
          req.user.user_id
        );
      } else {
        db.prepare(`
          INSERT INTO preferences (user_id, mood, interests, budget, duration, start_time, trip_type, people_count, transport, location)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          req.user.user_id,
          preferences.mood || 'Relaxed',
          interestsStr,
          preferences.budget || 'Moderate ($$)',
          preferences.duration || 'Half Day (4-5h)',
          preferences.start_time || '10:30 AM',
          preferences.trip_type || 'Friends',
          preferences.people_count || 2,
          preferences.transport || 'Metro / Public Transit',
          preferences.location || 'Bengaluru'
        );
      }
    }

    return res.json(plan);
  } catch (err) {
    console.error('Plan generation error:', err);
    return res.status(500).json({ error: 'Failed to generate personalized outing plan.' });
  }
};

// POST /api/plans/save (Authenticated)
exports.savePlan = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { title, description, estimated_cost, duration, match_score, route_info, why_matched, mood, location, items } = req.body;

    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Valid plan title and itinerary items are required.' });
    }

    const saveTransaction = db.transaction(() => {
      const planResult = db.prepare(`
        INSERT INTO plans (user_id, title, description, estimated_cost, duration, match_score, route_info, why_matched, mood, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        userId,
        title,
        description || '',
        estimated_cost || '',
        duration || '',
        match_score || 95,
        route_info || '',
        why_matched || '',
        mood || '',
        location || ''
      );

      const planId = planResult.lastInsertRowid;

      const insertItem = db.prepare(`
        INSERT INTO plan_items (plan_id, place_name, activity, start_time, end_time, travel_time, estimated_cost, latitude, longitude, category, insider_tip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const item of items) {
        insertItem.run(
          planId,
          item.place_name,
          item.activity || '',
          item.start_time || '',
          item.end_time || '',
          item.travel_time || '',
          item.estimated_cost || '',
          item.latitude || null,
          item.longitude || null,
          item.category || '',
          item.insider_tip || ''
        );
      }

      return planId;
    });

    const newPlanId = saveTransaction();

    return res.status(201).json({
      message: 'Plan saved successfully',
      plan_id: newPlanId
    });
  } catch (err) {
    console.error('Save plan error:', err);
    return res.status(500).json({ error: 'Failed to save outing plan.' });
  }
};

// GET /api/plans (Authenticated)
exports.getPlans = (req, res) => {
  try {
    const userId = req.user.user_id;
    const plans = db.prepare(`
      SELECT 
        p.*,
        CASE WHEN f.favourite_id IS NOT NULL THEN 1 ELSE 0 END AS is_favourite,
        CASE WHEN c.completed_id IS NOT NULL THEN 1 ELSE 0 END AS is_completed,
        c.completed_at
      FROM plans p
      LEFT JOIN favourites f ON f.plan_id = p.plan_id AND f.user_id = p.user_id
      LEFT JOIN completed_plans c ON c.plan_id = p.plan_id AND c.user_id = p.user_id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `).all(userId);

    // Fetch items for each plan
    const getItems = db.prepare('SELECT * FROM plan_items WHERE plan_id = ? ORDER BY item_id ASC');
    const enrichedPlans = plans.map(p => ({
      ...p,
      is_favourite: Boolean(p.is_favourite),
      is_completed: Boolean(p.is_completed),
      items: getItems.all(p.plan_id)
    }));

    return res.json(enrichedPlans);
  } catch (err) {
    console.error('Get plans error:', err);
    return res.status(500).json({ error: 'Failed to retrieve saved plans.' });
  }
};

// GET /api/plans/:id (Authenticated)
exports.getPlanById = (req, res) => {
  try {
    const userId = req.user.user_id;
    const planId = req.params.id;

    const plan = db.prepare(`
      SELECT 
        p.*,
        CASE WHEN f.favourite_id IS NOT NULL THEN 1 ELSE 0 END AS is_favourite,
        CASE WHEN c.completed_id IS NOT NULL THEN 1 ELSE 0 END AS is_completed,
        c.completed_at
      FROM plans p
      LEFT JOIN favourites f ON f.plan_id = p.plan_id AND f.user_id = p.user_id
      LEFT JOIN completed_plans c ON c.plan_id = p.plan_id AND c.user_id = p.user_id
      WHERE p.plan_id = ? AND p.user_id = ?
    `).get(planId, userId);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    const items = db.prepare('SELECT * FROM plan_items WHERE plan_id = ? ORDER BY item_id ASC').all(planId);

    return res.json({
      ...plan,
      is_favourite: Boolean(plan.is_favourite),
      is_completed: Boolean(plan.is_completed),
      items
    });
  } catch (err) {
    console.error('Get plan by ID error:', err);
    return res.status(500).json({ error: 'Failed to retrieve plan details.' });
  }
};

// DELETE /api/plans/:id (Authenticated)
exports.deletePlan = (req, res) => {
  try {
    const userId = req.user.user_id;
    const planId = req.params.id;

    const result = db.prepare('DELETE FROM plans WHERE plan_id = ? AND user_id = ?').run(planId, userId);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Plan not found or unauthorized.' });
    }

    return res.json({ message: 'Plan deleted successfully' });
  } catch (err) {
    console.error('Delete plan error:', err);
    return res.status(500).json({ error: 'Failed to delete plan.' });
  }
};

// POST /api/plans/:id/favourite (Authenticated)
exports.toggleFavourite = (req, res) => {
  try {
    const userId = req.user.user_id;
    const planId = req.params.id;

    // Verify ownership
    const plan = db.prepare('SELECT plan_id FROM plans WHERE plan_id = ? AND user_id = ?').get(planId, userId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    const existingFav = db.prepare('SELECT favourite_id FROM favourites WHERE user_id = ? AND plan_id = ?').get(userId, planId);

    let isFavourite = false;
    if (existingFav) {
      db.prepare('DELETE FROM favourites WHERE favourite_id = ?').run(existingFav.favourite_id);
      isFavourite = false;
    } else {
      db.prepare('INSERT INTO favourites (user_id, plan_id) VALUES (?, ?)').run(userId, planId);
      isFavourite = true;
    }

    return res.json({
      message: isFavourite ? 'Added to favourites' : 'Removed from favourites',
      is_favourite: isFavourite
    });
  } catch (err) {
    console.error('Toggle favourite error:', err);
    return res.status(500).json({ error: 'Failed to toggle favourite.' });
  }
};

// POST /api/plans/:id/complete (Authenticated)
exports.toggleComplete = (req, res) => {
  try {
    const userId = req.user.user_id;
    const planId = req.params.id;

    const plan = db.prepare('SELECT plan_id FROM plans WHERE plan_id = ? AND user_id = ?').get(planId, userId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    const existingComp = db.prepare('SELECT completed_id FROM completed_plans WHERE user_id = ? AND plan_id = ?').get(userId, planId);

    let isCompleted = false;
    if (existingComp) {
      db.prepare('DELETE FROM completed_plans WHERE completed_id = ?').run(existingComp.completed_id);
      isCompleted = false;
    } else {
      db.prepare('INSERT INTO completed_plans (user_id, plan_id) VALUES (?, ?)').run(userId, planId);
      isCompleted = true;
    }

    return res.json({
      message: isCompleted ? 'Plan marked as completed!' : 'Plan unmarked as completed',
      is_completed: isCompleted
    });
  } catch (err) {
    console.error('Toggle complete error:', err);
    return res.status(500).json({ error: 'Failed to update plan completion status.' });
  }
};
