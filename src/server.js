import 'dotenv/config';

import app from './app.js';
import httpsOptions from './httpsOptions.js';
import https from 'https';
import { Server as SocketIOServer } from 'socket.io';

const PORT = process.env.PORT || 7777;

const server = https.createServer(httpsOptions, app);

const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.set('io', io);

io.on('connection', (socket) => console.log('Um usuário conectado'));

server.listen(PORT, '0.0.0.0', () =>
    console.log(`Iniciando o servidor na porta: ${PORT}`),
);
