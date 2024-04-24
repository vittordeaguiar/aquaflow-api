/** Valida os dados do cliente.
 * @param {object} data Objeto contendo os dados do cliente a serem validados.
 * @throws {Error} Se algum dado obrigatório estiver faltando.
 */
export default async (data) => {
    const errors = [];

    if (!data.name) errors.push('Nome é obrigatório');
    if (!data.cpf) errors.push('CPF é obrigatório');
    if (!data.email) errors.push('Email é obrigatório');
    if (!data.cellphone) errors.push('Celular é obrigatório');

    if (errors.length > 0) throw new Error(errors.join(', '));
};
