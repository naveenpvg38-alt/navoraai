const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');

router.get('/profile', requireAuth, profileController.getProfile);
router.put('/profile', requireAuth, profileController.updateProfile);

module.exports = router;
