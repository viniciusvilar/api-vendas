import { ListProductsSerice } from "@modules/products/services/ListProductsService";
import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUsersService";
import { instanceToInstance } from 'class-transformer'

export class UserController {

    public async listUser(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();
        console.log(request.user.id)
        const users = await listUsers.execute();
        return response.json(instanceToInstance(users));
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body
        const createUser = new CreateUserService();
        const user = await createUser.execute({name, email, password});
        return response.json(instanceToInstance(user));
    }

}