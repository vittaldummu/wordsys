import { Router } from 'express';
const path = require('path');
import {
  adminSignupHandler,
  adminSigninHandler,
  adminChangePWHandler,
} from '../controllers/admin';
import isAdminLoggedIn from '../middlewares/isAdmin';

const router = Router();

/**
 * @desc This is route to signUP users
 * @route admin/signup
 * @type POST
 */
router.post('/signup', adminSignupHandler);
/**
 * @desc route to signIn admin
 * @route admin/login
 * @type POST
 */
router.post('/signin', adminSigninHandler);

router.patch('/PWChange/:id', isAdminLoggedIn, adminChangePWHandler);

export { router as default };
