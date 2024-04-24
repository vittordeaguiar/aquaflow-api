import { validateUser } from '../helpers/index.js';
import bcrypt from 'bcrypt';

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    /** Cria um novo usuário.
     * @param {Object} data - Os dados do usuário a ser criado.
     * @returns {Promise<Object>} - Uma promise que resolve com o usuário criado.
     * @throws {Error} - Se ocorrer um erro ao criar o usuário.
     */
    create = async (data) => {
        try {
            await validateUser(data);
            data.password = await bcrypt.hash(data.password, 10);
            data.role = 'ADMIN';
            return await this.userRepo.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    };

    findById = async (id) => await this.userRepo.findById(id);
}

export default UserService;
