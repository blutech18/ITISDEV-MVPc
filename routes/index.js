const express = require('express');
const router = express.Router();

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

module.exports = router;