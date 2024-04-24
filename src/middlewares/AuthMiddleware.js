import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.cookies.sessionProof;

    if (!token) return res.status(401).json({ message: 'Nenhum token fornecido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido.' });
        req.user = user;
        next();
    });
};
