import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface InterfaceUser {
    name: string,
    email: string,
    password: string,
}

export class CreateUserService {
    public async execute({ name, email, password }: InterfaceUser): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("This email already used!")
        }

        const hashedPassword = await hash(password, 8)

        const user = userRepository.create({ 
            name,
            email, 
            password: hashedPassword 
        });

        await userRepository.save(user);

        return user;
    }
}