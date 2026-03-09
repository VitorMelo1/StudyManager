const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/', (req, res, next) => UserController.create(req, res, next));
router.get('/', (req, res, next) => UserController.list(req, res, next));
router.get('/:id', (req, res, next) => UserController.getById(req, res, next));
router.put('/:id', (req, res, next) => UserController.update(req, res, next));
router.delete('/:id', (req, res, next) => UserController.delete(req, res, next));
router.get('/:id/courses', (req, res, next) => UserController.getUserCourses(req, res, next));

module.exports = router;

