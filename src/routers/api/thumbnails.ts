import express from 'express'
import { UploadedFile } from 'express-fileupload'
import fm from '../../utils/file-manager'
import resizer from '../../utils/resizer'
import { jsonfiyPhoto, jsonfiyThumbnail } from '../../utils/jsonUtils'

const thumbnails = express.Router()

thumbnails.get('/', async (req, res) => {
    const allThumbnails = await fm.allThumbnails()
    return res.send(allThumbnails)
})

export default thumbnails
