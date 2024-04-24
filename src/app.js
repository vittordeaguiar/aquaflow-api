import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './routers/router.js';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerSpec = YAML.load(
    path.join(__dirname, 'swaggerDoc', 'swagger.yml'),
);

const app = express();

app.use(compression());
app.use(cookieParser());

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// Middleware para anexar io ao req
app.use((req, res, next) => {
    req.io = app.get('io'); // Busca o io que foi definido em server.js
    next();
});

app.set('trust proxy', true);

app.use('/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
