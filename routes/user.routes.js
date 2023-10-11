const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//validations
const registerValidation = require('../validations/register.validation');
const updateValidation = require('../validations/Update.validation');
const loginValidation = require('../validations/login.validation');
const tokenValidation = require('../validations/token.validation');
const getUserValidation = require('../validations/getUser.validation');

//services

const { upload } = require('../services/multer.service');

router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);
router.get('/checkuser', tokenValidation, userController.checkuser);
router.get(
  '/id/:id',
  tokenValidation,
  getUserValidation,
  userController.GetUserById,
);
router.post(
  '/edit',
  tokenValidation,
  updateValidation,
  userController.editUser,
);

router.post(
  '/update/image',
  upload.single('file'),
  userController.updatePhotoUser,
);

module.exports = router;
