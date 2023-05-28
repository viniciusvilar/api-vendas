import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'

interface InterfaceUser {
    email: string,
    password: string,
}

interface InterfaceResponse {
    user: User;
    token: string
}

export class CreateSessionService {
    public async execute({ email, password }: InterfaceUser): Promise<InterfaceResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed) {
            throw new AppError("Incorrect email/password combination.", 401)
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user,
            token
        };
    }
}