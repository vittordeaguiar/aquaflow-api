import { validateClient } from '../helpers/index.js';
import bcrypt from 'bcrypt';

class ClientService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    /** Cria um novo cliente.
     * @param {Object} data - Os dados do cliente a ser criado.
     * @returns {Promise<Object>} - Uma promessa que resolve com o cliente criado.
     * @throws {Error} - Se ocorrer um erro ao criar o cliente.
     */
    create = async (data) => {
        try {
            await validateClient(data);
            const pass =
                data.name
                    .split(' ')[0]
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase() + data.cpf.slice(0, 3);
            data.password = await bcrypt.hash(pass, 10);
            data.role = 'USER';
            return await this.userRepo.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar cliente: ${error.message}`);
        }
    };

    /** Retorna todos os clientes.
     * @returns {Promise<Array>} Uma promise que resolve em um array contendo todos os clientes.
     */
    getAll = async () => await this.userRepo.getAllClients();

    /** Obtém um cliente pelo seu ID.
     * @param {number} id - O ID do cliente.
     * @returns {Promise<Object>} - Uma Promise que resolve com o objeto do cliente encontrado.
     */
    getById = async (id) => await this.userRepo.getClientById(id);

    /** Atualiza um cliente.
     * @param {Object} data - Os dados do cliente a serem atualizados.
     * @returns {Promise} - Uma promise que resolve com o resultado da atualização.
     * @throws {Error} - Se ocorrer um erro durante a atualização do cliente.
     */
    update = async (data) => {
        try {
            await validateClient(data);
            return await this.userRepo.update(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar cliente: ${error.message}`);
        }
    };
}

export default ClientService;
