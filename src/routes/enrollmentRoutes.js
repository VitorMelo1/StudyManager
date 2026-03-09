const express = require('express');
const EnrollmentController = require('../controllers/EnrollmentController');

const router = express.Router();

router.post('/', (req, res, next) => EnrollmentController.create(req, res, next));

module.exports = router;

