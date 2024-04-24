/** Verifica se um CEP é válido.
 * @param {string} zipcode - O CEP a ser verificado.
 * @returns {boolean} Retorna true se o CEP for válido, caso contrário retorna false.
 */
export default (zipcode) => {
    const cleaZipcode = zipcode.replace(/\D/g, '');
    return cleaZipcode.length === 8 && /^\d+$/.test(cleaZipcode);
};
