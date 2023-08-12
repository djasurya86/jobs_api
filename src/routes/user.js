const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const userController = require('../controllers/user/index');

router.post('/login', upload.none(), userController.login);

module.exports = router;