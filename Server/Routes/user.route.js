
const express = require('express');
const { getUser, login, register } = require('../controller/user.controller');

const router = express.Router();


router.get('/', getUser);
router.post('/login', login);
router.post('/signup', register);

module.exports = router;