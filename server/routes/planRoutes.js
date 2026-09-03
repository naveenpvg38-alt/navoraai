const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// Outing generation (supports both guests and authenticated users)
router.post('/planner/generate', optionalAuth, planController.generatePlan);

// Saved plans CRUD
router.post('/plans/save', requireAuth, planController.savePlan);
router.get('/plans', requireAuth, planController.getPlans);
router.get('/plans/:id', requireAuth, planController.getPlanById);
router.delete('/plans/:id', requireAuth, planController.deletePlan);

// Favourites & Completion status (supports both route styles)
router.post('/plans/:id/favourite', requireAuth, planController.toggleFavourite);
router.post('/plans/:id/complete', requireAuth, planController.toggleComplete);

module.exports = router;
