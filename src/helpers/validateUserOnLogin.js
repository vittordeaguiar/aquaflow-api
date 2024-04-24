import bcrypt from 'bcrypt';

/** Valida os dados do usuário.
 * @param {object} data Objeto contendo os dados do usuário que deseja fazer login.
 * @throws {Error} Se algum dado obrigatório estiver faltando.
 */
export default async (data, password) => {
    if (!data) throw new Error('O usuário não existe.');
    const isPassValid = await bcrypt.compare(password, data.password);
    if (!isPassValid) throw new Error('Senha inválida.');
};
