import sharp from 'sharp'
import { fullPath,thumbnailOf } from './file-manager'

export default async function resizer(fileName: string){ 
       
    sharp(fullPath(fileName))
    .resize(300)
    .toFile(fullPath(thumbnailOf(fileName)))
    .catch(err => console.log('Error: ', err))
}