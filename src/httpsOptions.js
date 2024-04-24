import fs from 'fs';

const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

const httpsOptions = { key: key, cert: cert };

export default httpsOptions;
