import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path'

interface InterfaceUser {
    email: string,
}

export class SendForgotPasswordEmailService {
    public async execute({ email }: InterfaceUser): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User dos not exists.')
        }

        const {token} = await userTokensRepository.generate(user.id)

        const forgotPasswordTemplate = path.resolve(
            __dirname, '..', 'views', 'forgot_password.hbs'
        )

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API VENDAS] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`,
                }
            }
        })
    }
}