import { AddressRepository } from '../repositories/index.js';
import { AddressService } from '../services/index.js';

const addressService = new AddressService(new AddressRepository());

class AddressController {
    /** Busca um endereço por um CEP inserido pelo usuário. */
    getByZipcode = async (req, res) => {
        try {
            const data = await addressService.getByZipcode(req.params.zipcode);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /** Cria um endereço no banco de dados. */
    create = async (req, res) => {
        try {
            const data = await addressService.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    /** Atualiza um endereço. */
    update = async (req, res) => {
        try {
            await addressService.update(req.body);
            res.status(200).json(`Endereço atualizado.`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default AddressController;
