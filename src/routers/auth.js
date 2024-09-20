import {Router} from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSigninSchema, userSignupSchema } from '../validation/users.js';
import * as authController from '../controller/auth.js';


const authRouter = Router();

authRouter.post('/register' , validateBody(userSignupSchema) , ctrlWrapper(authController.signupController));
authRouter.post('/login' , validateBody(userSigninSchema) , ctrlWrapper(authController.singinController));
authRouter.post('/refresh' , ctrlWrapper(authController.refreshController));
authRouter.post('/logout' , ctrlWrapper(authController.logoutController));
export default authRouter;
