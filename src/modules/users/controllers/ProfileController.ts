import { ListProductsSerice } from "@modules/products/services/ListProductsService";
import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUsersService";
import { ShowProfileService } from "../services/ShowProfileService";
import { UpdateProfileService } from "../services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer'

export class ProfileController {

    public async listUser(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService;
        const user_id = request.user.id;

        const user = await showProfile.execute({ user_id })

        return response.json(instanceToInstance(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password
        })

        return response.json(instanceToInstance(user))
    }

}