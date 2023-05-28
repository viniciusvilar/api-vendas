import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { Joi, Segments, celebrate } from "celebrate";

export const sessionsRouter = Router()
const sessionController = new SessionController();

sessionsRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.create);
