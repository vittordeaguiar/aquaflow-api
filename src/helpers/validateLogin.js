/** Valida os dados do usuário.
 * @param {object} data Objeto contendo os dados do usuário que deseja fazer login.
 * @throws {Error} Se algum dado obrigatório estiver faltando.
 */
export default async (data) => {
    const errors = [];

    if (!data.email) errors.push('Email é obrigatório');
    if (!data.password) errors.push('Senha é obrigatória');

    if (errors.length > 0) throw new Error(errors.join(', '));
};
