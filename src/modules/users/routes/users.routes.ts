import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Segments, celebrate, Joi } from "celebrate";
import multer from "multer";
import uploadConfig from '@config/upload'
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";

const usersRouter = Router();
const userControler = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig)

usersRouter.get('/', isAuthenticated, userControler.listUser)

usersRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    userControler.createUser
)

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
)

export default usersRouter;