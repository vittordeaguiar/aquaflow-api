import { UserRepository } from '../repositories/index.js';
import { ClientService } from '../services/index.js';

const clientService = new ClientService(new UserRepository());

class ClientController {
    /** Cria um novo usuário como cliente. */
    create = async (req, res) => {
        try {
            await clientService.create(req.body);
            res.status(201).json(`Cliente criado.`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /** Busca todos os usuários clientes no banco de dados. */
    getAll = async (req, res) => {
        try {
            const list = await clientService.getAll();
            res.status(200).json(list);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /** Busca um usuário cliente através do seu ID. */
    getById = async (req, res) => {
        try {
            const client = await clientService.getById(req.params.id);
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /** Atualiza um usuário cliente. */
    update = async (req, res) => {
        try {
            await clientService.update(req.body);
            res.status(200).json(`Cliente atualizado.`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default ClientController;
