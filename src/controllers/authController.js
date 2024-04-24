import { authenticateToken } from '../helpers/index.js';
import UserRepository from '../repositories/userRepository.js';
import { AuthService } from '../services/index.js';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

class AuthController {
    login = async (req, res) => {
        try {
            const { token, user } = await authService.login(req.body);

            res.cookie('sessionProof', token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'None',
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: `Erro ao fazer login: ${error.message}`,
            });
        }
    };

    logout = (req, res) => {
        res.cookie('sessionProof', '', {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        res.status(200).json({ message: 'Logout efetuado com sucesso.' });
    };

    checkAuth = async (req, res) => {
        try {
            const decoded = await authenticateToken(req.cookies.sessionProof);
            res.status(200).json({
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

    verifyToken = async (req, res) => {
        try {
            const decoded = await this.service.verifyToken(req.query.token);
            res.status(200).json({
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
            });
        } catch (error) {
            res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    };

    generateIntegrationAccessToken = async (req, res) => {
        try {
            const token = this.service.generateIntegrationAccessToken();
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(`Erro interno do servidor: ${error.message}`);
        }
    };
}

export default AuthController;
