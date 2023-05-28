import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import path from "path";
import uploadConfig from '@config/upload'
import fs from 'fs'

interface InterfaceUser {
    user_id: string,
    avatarFileName?: string,
}

export class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: InterfaceUser): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found.")
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}