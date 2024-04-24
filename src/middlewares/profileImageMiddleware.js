require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|heic/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Erro: Apenas imagens!'), false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.userId;
        const dest = path.join(process.env.PROFILES_IMAGES_PATH, userId);
        const galleryPath = path.join(dest, 'profileImage');
        if (!fs.existsSync(galleryPath)) {
            fs.mkdirSync(galleryPath, { recursive: true });
        }
        cb(null, galleryPath);
    },
    filename: (req, file, cb) => {
        const fileBaseName = `${Date.now()}${path.extname(file.originalname)}`;
        const userId = req.body.userId;

        // O caminho relativo a ser armazenado no banco de dados
        const relativePath = `/${userId}/profileImage/${fileBaseName}`;
        req.fileRelativePath = relativePath; // Adiciona o caminho relativo ao objeto req

        // O caminho absoluto onde o arquivo será salvo
        const fullPath = path.join(
            process.env.PROFILES_IMAGES_PATH,
            relativePath,
        );

        // Excluir imagens existentes antes de salvar uma nova
        fs.readdir(path.dirname(fullPath), (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(path.dirname(fullPath), file), (err) => {
                    if (err) throw err;
                });
            }
        });

        cb(null, fileBaseName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB
        fieldSize: 2 * 1024 * 1024, // 2 MB
    },
});

module.exports = upload;
