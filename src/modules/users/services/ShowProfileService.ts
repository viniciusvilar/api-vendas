import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface InterfaceRequest {
    user_id: string
}

export class ShowProfileService {
    public async execute({ user_id }: InterfaceRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.')
        }

        return user;
    }
}