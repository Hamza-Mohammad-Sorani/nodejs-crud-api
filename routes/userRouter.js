const express = require('express');

const userController = require('../controllers/userController');

const { body } = require('express-validator');

const router = express.Router();

router.get('/', userController.getAll);

router.post('/create', [
    body('name').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('mobile').isLength({ min: 7, max: 15 })
], userController.createUser);

router.delete('/delete/:id', userController.deleteUser);

router.put('/edit/:id', userController.editUser);

module.exports = router;