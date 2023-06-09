import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { celebrate, Joi, Segments} from 'celebrate';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/', productController.listProducts);

productsRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    productController.showProduct
);

productsRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    }),
    productController.create
);

productsRouter.put(
    '/:id', 
    celebrate( {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string(),
            price: Joi.number().precision(2),
            quantity: Joi.number()
        }
    }),
    productController.update
);
productsRouter.delete(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    productController.delete
);

export default productsRouter;