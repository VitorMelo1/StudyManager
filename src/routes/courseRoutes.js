const express = require('express');
const CourseController = require('../controllers/CourseController');

const router = express.Router();

router.post('/', (req, res, next) => CourseController.create(req, res, next));
router.get('/', (req, res, next) => CourseController.list(req, res, next));
router.get('/:id', (req, res, next) => CourseController.getById(req, res, next));
router.put('/:id', (req, res, next) => CourseController.update(req, res, next));
router.delete('/:id', (req, res, next) => CourseController.delete(req, res, next));

module.exports = router;

