import {
    generateToken,
    validateLogin,
    validateUserOnLogin,
} from '../helpers/index.js';

class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    login = async (data) => {
        await validateLogin(data);

        const entity = await this.userRepo.getByEmail(data.email);

        await validateUserOnLogin(entity, data.password);

        const user = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            role: entity.role,
        };

        const token = await generateToken(user);

        return { token, user };
    };
}

export default AuthService;
