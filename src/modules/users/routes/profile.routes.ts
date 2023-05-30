import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Segments, celebrate, Joi } from "celebrate";
import multer from "multer";
import uploadConfig from '@config/upload'
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.listUser)

profileRouter.put(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                })
        }
    }),
    profileController.update
)

export default profileRouter;