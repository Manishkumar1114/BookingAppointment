const express = require('express');
const userController = require('../controllers/userController'); // Check this path

const router = express.Router();


router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;
