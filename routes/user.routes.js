const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//custom middlewares
const registerValidation = require('../validations/register/isValidRegister');
const updateValidation = require('../validations/update/isValidUpdate');
const loginValidation = require('../validations/login/isValidLogin');
const tokenValidation = require('../validations/token/isValidToken');
const getUserValidation = require('../validations/token/isValidTokenId');
const uploadImageValidation = require('../validations/upload/isValidImageUpload');

//services
const { imageUpload } = require('../services/multer.service');

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
  '/update/avatar/:id',
  tokenValidation,
  imageUpload.single('file'),
  uploadImageValidation,
  getUserValidation,
  userController.updateAvatarUser,
);

module.exports = router;
