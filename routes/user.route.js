const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares/user.validator');

router.post('/register', validateUser, userController.register);
router.post('/login', userController.login);

module.exports = router;