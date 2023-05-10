import multer from 'multer';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import imagemagick from 'imagemagick';
import { Console } from 'console';
import { promises as fs } from 'fs';
import { ObjectId } from 'mongodb';
import { connectRedis } from '../config/redis';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, 'images')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req: any, res: any) => {
    const file = req.file;

    console.log(file);

    if (!file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const id = new ObjectId();
    const image = {
        _id: id,
        name: file.filename,
        path: file.path,
        size: file.size,
        type: file.mimetype,
        originalName: file.originalname,
        url: `http://localhost:4000/v1/images/${file.filename}`
    }
    await imagemagick.resize({
        srcPath: file.path,
        dstPath: file.path,
        width: 200,
        height: 200

    }, function (err: any, result: any) {

        if (err) throw err;
        
        console.log('resized image to fit within 200x200px');
    });

        res.json(image.url)
});

router.get('/:name', async (req: any, res: any) => {
    req.params.name = req.params.name.replace(/\\/g, '/');
    res.sendFile(path.join(__dirname, `../../images/${req.params.name}`));
});


export default router;