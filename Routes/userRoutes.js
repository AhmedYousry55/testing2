// const express = require('express');
// const router = express.Router();

// const authController = require('../controllers/authController');
// const userControllers = require('./../controllers/userControllers');

// router.route('/signup').post(authController.signup);
// router.route('/forgotPassword').post(authController.login);
// router.route('/resetPassword').post(authController.login); 
// router
//   .route('/')
//   .get(userControllers.getAllUsers)
//   .post(userControllers.CreateUser);
// router
//   .route('/:id')
//   .get(userControllers.getOneUser)
//   .patch(userControllers.updateUser)
//   .delete(userControllers.deleteUser);

// module.exports = router;
//////////////////////////////////////////////////////////////////////////////////


const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
// router.patch(
//   '/updateMe',
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
