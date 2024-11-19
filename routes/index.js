import express from 'express';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();


// login page
// get
router.get('login', (req, res) => {
  res.render('https://screen-wise.vercel.app/login');
});

// Dashboard
// get
router.get('dashboard', isAuthenticated, (req, res) => {
  res.render('https://screen-wise.vercel.app/dashboard');
});

export default router;