const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/auth');


// Dashboard route - protected, only accessible to authenticated users
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard', { 
      title: 'Green Archers Analytics - Dashboard',
      user: req.session.user
  });
});


module.exports = router;
