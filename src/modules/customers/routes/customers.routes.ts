import { Router } from 'express';
import { celebrate, Joi, Segments} from 'celebrate';
import { CustomersControllers } from '../controllers/CustomersController';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

const customerRouter = Router();
const customerController = new CustomersControllers();

customerRouter.use(isAuthenticated)

customerRouter.get('/', customerController.listCustomers);

customerRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customerController.showCustomer
);

customerRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required()
        }
    }),
    customerController.create
);

customerRouter.put(
    '/:id', 
    celebrate( {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string().email().required()
        }
    }),
    customerController.update
);
customerRouter.delete(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customerController.delete
);

export default customerRouter;