import axios from 'axios';
import { validateZipcode, validateAddress } from '../helpers/index.js';

const BRASIL_API_URL = 'https://brasilapi.com.br/api/cep/v1/';

class AddressService {
    constructor(addressRepo) {
        this.addressRepo = addressRepo;
    }

    /** Obtém os dados de um endereço a partir de um CEP.
     * @param {string} zipcode - O CEP a ser pesquisado.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do endereço.
     * @throws {Error} - Se o CEP for inválido.
     */
    getByZipcode = async (zipcode) => {
        if (!validateZipcode(zipcode)) throw new Error('CEP inválido.');
        const { data } = await axios.get(`${BRASIL_API_URL}${zipcode}`);
        return data;
    };

    /** Cria um endereço.
     * @param {Object} address - O endereço a ser criado.
     * @returns {Promise} Uma promise que resolve com o endereço criado.
     */
    create = async (address) => {
        await validateAddress(address);
        return this.addressRepo.create(address);
    };

    /** Atualiza um cliente.
     * @param {Object} data - O objeto do cliente a ser atualizado.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do cliente atualizado.
     */
    update = async (data) => {
        try {
            await validateAddress(data);
            return await this.addressRepo.update(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar cliente: ${error.message}`);
        }
    };
}

export default AddressService;
