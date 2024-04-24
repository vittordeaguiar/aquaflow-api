import { validateZipcode } from '../helpers/index.js';
/**
 * Valida um endereço.
 * @param {Object} address - O endereço a ser validado.
 * @throws {Error} Lança um erro se o algum campo obrigatório não for informado.
 */
export default async (address) => {
    if (!address) throw new Error('Endereço não informado.');
    if (!address.zipcode) throw new Error('CEP não informado.');
    if (!validateZipcode(address.zipcode)) throw new Error('CEP inválido.');
    if (!address.street) throw new Error('Logradouro não informado.');
    if (!address.number) throw new Error('Número não informado.');
    if (!address.neighborhood) throw new Error('Bairro não informado.');
    if (!address.city) throw new Error('Cidade não informada.');
    if (!address.state) throw new Error('Estado não informado.');
};
