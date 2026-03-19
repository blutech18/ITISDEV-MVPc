const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Tournament = require('../models/Tournament');

const { isAuthenticated } = require('../middleware/auth');

// Dashboard
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard', { 
      title: 'Green Archers Analytics - Dashboard',
      user: req.session.user
  });
});

// Statistics Encoding page
router.get('/statistics-encoding', isAuthenticated, (req, res) => {
  res.render('pages/statistics-encoding', {
      title: 'Statistics Encoding',
      user: req.session.user
  });
});

// Games list page
router.get('/games', isAuthenticated, async (req, res) => {
  try {
    const games = await Game.find()
      .populate('tournament', 'name league season')
      .sort({ gameDate: -1 })
      .lean();
    const tournaments = await Tournament.find().sort({ startDate: -1 }).lean();
    const user = req.session.user;
    const isAdminOrCoach = user && (user.role === 'Admin' || user.role === 'Coach');
    res.render('pages/games', {
      title: 'Games',
      games,
      tournaments,
      isAdminOrCoach,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading games page');
  }
});

module.exports = router;