// MulterConfig.js

import multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(path.resolve(), 'CVs');
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        console.log('Original Filename:', file.originalname);
        // Define the filename for uploaded files
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
