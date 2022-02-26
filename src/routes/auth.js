// src/routes/auth.js

const express = require('express');
const Auth = require('../controllers/auth');
const router = express.Router();


router.post('/signin', Auth.signin);
router.post('/signout', Auth.signout);


module.exports = router;