import express from 'express'
import { UploadedFile } from 'express-fileupload'
import fm from '../../utils/file-manager'
import { jsonfiyPhoto, jsonfiyError } from '../../utils/jsonUtils'

const photos = express.Router()

// Todo: rework this method to get all photos and their thumbs 
photos.get('/', async (req, res) => {
    const allPhotos = await fm.allPhotos()
    return res.send(allPhotos)
})

photos.post('/', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No File was Uploaded'
            })
        } else {
            const result = await fm.savePhoto(req.files.photo as UploadedFile)
            res.send(result)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

photos.get('/:fileName', async (req, res) => {
    if (!fm.doesExist(req.params.fileName))
        return res.status(404).send(jsonfiyError(req.params.fileName))
    res.send(await jsonfiyPhoto(req.params.fileName))
})



export default photos