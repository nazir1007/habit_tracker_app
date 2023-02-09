// ---------- Importing Modules ---------- //
const express = require('express');
const router = express.Router();

// ---------- Importing habit_controller ---------- //
const habitControllers = require('../controllers/habit_controller');


//---------Welcome Page----------//
router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', habitControllers.dashboard);
router.get('/favourite-habit', habitControllers.favouriteHabit);
router.get('/status-update', habitControllers.statusUpdate);
router.get('/remove', habitControllers.remove);
router.post('/dashboard', habitControllers.createDashboard);
router.post('/user-view', habitControllers.userView);

router.use('/users', require('./users'))

module.exports = router;