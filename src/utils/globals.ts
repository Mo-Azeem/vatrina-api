import path from 'path'

export const originalPhotosPath: string = path.join(process.cwd(), 'photos/originals/')
export const thumbnailPhotosPath: string = path.join(process.cwd(), 'photos/thumbnails/')

export const servingPhotosURL: string = '/serving/photos/'
export const servingThumbnailsURL: string = '/serving/thumbnails/'

export default {
    originalPhotosPath,
    thumbnailPhotosPath,
    servingPhotosURL,
    servingThumbnailsURL
}