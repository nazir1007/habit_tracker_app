// ---------- Importing Modules ---------- //
const express = require('express');
const router =  express.Router();

// ---------- Importing users_controller ---------- //
const usersControllers = require('../controllers/users_controller');


router.get('/login', usersControllers.login);
router.get('/register', usersControllers.register);
router.get('/logout', usersControllers.logout);
router.post('/login', usersControllers.createLogin);
router.post('/register', usersControllers.createRegister);

module.exports = router;
  