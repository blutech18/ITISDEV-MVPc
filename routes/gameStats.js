const express = require('express');
const router = express.Router();
const gameStatsController = require('../controllers/gameStatsController');

const { isAuthenticated, authorize } = require('../middleware/auth');

//router.use(isAuthenticated); 


// Create a new game statistic entry
router.post('/create', gameStatsController.createGameStats);

// Update game statistics by ID
router.put('/update/:id', gameStatsController.updateGameStats);

// Delete game statistics by ID
router.delete('/delete/:id', gameStatsController.deleteGameStats);

// Get game stats by gameId 
router.get('/game/:gameId', gameStatsController.getStatsByGameId);

// Get game stats by playerId 
router.get('/player/:playerId', gameStatsController.getStatsByPlayerId);

// Get all game stats - returns all game stats for all players and games (useful for analytics and admin management)
router.get('/all', gameStatsController.getAllGameStats);



// Export the router to be used in app.js
module.exports = router;