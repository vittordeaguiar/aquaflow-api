import 'dotenv/config';
import jwt from 'jsonwebtoken';
/** Gera um token JWT com base nos dados fornecidos.
 * @param {Object} data - Os dados do usuário para os quais o token será gerado.
 * @param {string} data.id - O ID do usuário.
 * @param {string} data.name - O nome do usuário.
 * @param {string} data.email - O email do usuário.
 * @returns {Promise<string>} Uma promessa que resolve com o token JWT gerado.
 */
export default (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '6h' },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};
