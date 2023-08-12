const express = require('express');
const router = express.Router();

const userLoginMiddleware = require("../middlewares/UserLoginMiddleware");
const jobController = require('../controllers/job/index');

router.get('/list', userLoginMiddleware, jobController.list);
router.get('/detail/:id', userLoginMiddleware, jobController.detail);

module.exports = router;