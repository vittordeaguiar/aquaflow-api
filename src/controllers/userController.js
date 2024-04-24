import { UserRepository } from '../repositories/index.js';
import { UserService } from '../services/index.js';

const userService = new UserService(new UserRepository());

class UserController {
    /** Cria um novo usuário. */
    create = async (req, res) => {
        try {
            await userService.create(req.body);
            res.status(201).json(`Usuário criado.`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default UserController;
