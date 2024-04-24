import 'dotenv/config';
import jwt from 'jsonwebtoken';
/** Verifica se um token é válido e autentica o usuário.
 * @param {string} token - O token a ser verificado e autenticado.
 * @returns {Promise<object>} - Uma Promise que resolve com o objeto decodificado do token.
 * @throws {Error} - Se o token for inválido.
 * @throws {string} - Se o usuário não estiver autenticado.
 */
export default async (token) => {
    if (!token) throw new Error('Token inválido.');
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) reject('Usuário não autenticado.');
            resolve(decoded);
        });
    });
};
