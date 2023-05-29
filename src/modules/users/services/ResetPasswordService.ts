import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import { hash } from 'bcryptjs'
import { AppError } from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns'

interface InterfaceUser {
    token: string,
    password: string
}

export class ResetPasswordService {
    public async execute({ token, password }: InterfaceUser): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const userToken = await userTokensRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('User Token does not exists.')
        }

        const user = await userRepository.findById(userToken.user_id)

        if (!user) {
            throw new AppError('User does not exists.')
        }

        const tokenCreatedAt = userToken.created_at
        const compareDate = addHours(tokenCreatedAt, 2)

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.')
        }

        user.password = await  hash(password, 8);

        await userRepository.save(user)

    }
}