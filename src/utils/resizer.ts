import sharp from 'sharp'
import { fullPath,thumbnailOf } from './file-manager'

export default async function resizer(fileName: string){    
    sharp(fullPath(fileName))
    .resize(200)
    .toFile(fullPath(thumbnailOf(fileName)))
}