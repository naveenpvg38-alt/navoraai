const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { JWT_SECRET } = require('../middleware/auth');

function createToken(user) {
  return jwt.sign(
    { user_id: user.user_id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.signup = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = db.prepare('SELECT user_id FROM users WHERE email = ?').get(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `).run(name.trim(), cleanEmail, passwordHash);

    const userId = result.lastInsertRowid;

    // Create default preference row
    db.prepare(`
      INSERT INTO preferences (user_id, mood, interests, budget, duration, start_time, trip_type, people_count, transport, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      'Relaxed',
      'Cafes, Nature, Art',
      'Moderate ($$)',
      'Half Day (4-5h)',
      '11:00 AM',
      'Friends',
      2,
      'Public Transit',
      'Bengaluru, Karnataka'
    );

    const user = { user_id: userId, name: name.trim(), email: cleanEmail };
    const token = createToken(user);

    return res.status(201).json({
      message: 'Account created successfully',
      user,
      token
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error during account registration.' });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = createToken(user);

    return res.json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
};

exports.demoLogin = (req, res) => {
  try {
    const demoEmail = 'demo@navora.ai';
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(demoEmail);

    if (!user) {
      return res.status(404).json({ error: 'Demo account not initialized.' });
    }

    const token = createToken(user);

    return res.json({
      message: 'Logged in as Demo User',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      token
    });
  } catch (err) {
    console.error('Demo login error:', err);
    return res.status(500).json({ error: 'Server error during demo login.' });
  }
};

exports.me = (req, res) => {
  try {
    const user = db.prepare('SELECT user_id, name, email, created_at FROM users WHERE user_id = ?').get(req.user.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const preferences = db.prepare('SELECT * FROM preferences WHERE user_id = ?').get(req.user.user_id);

    return res.json({
      user,
      preferences: preferences || null
    });
  } catch (err) {
    console.error('Me error:', err);
    return res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};
