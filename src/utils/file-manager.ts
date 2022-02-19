import fs from 'fs/promises'
import { existsSync, statSync } from 'fs'
import p from 'path'
import { thumbnailPhotosPath, originalPhotosPath } from './globals'
import { UploadedFile } from 'express-fileupload'
import resizer from './resizer'
import { jsonfiyPhoto, jsonfiyThumbnail } from './jsonUtils'


export const allPhotos = async () => {
    const _allPhotos = await fs.readdir(originalPhotosPath)
    const allPhotos = await Promise.all(_allPhotos.map(async (photo) => await jsonfiyPhoto(photo)))
    return allPhotos;
}

export const allThumbnails = async () => {
    const _allThumbnails = await fs.readdir(thumbnailPhotosPath)
    const allThumbnails = await Promise.all(_allThumbnails.map(async (thumbnail) => await jsonfiyThumbnail(thumbnail)))
    return allThumbnails;
}

export const fullPath = (fileName: string): string => {
    if (fileName.includes('thumb-'))
        return p.join(thumbnailPhotosPath, fileName)
    return p.join(originalPhotosPath, fileName)
}

export const doesExist = (fileName: string) => {
    return existsSync(fullPath(fileName))
}

export const sizeOf = (fileName: string) => {
    return ((statSync(fullPath(fileName)).size) / (1024 * 1024)).toFixed(2)
}

export const thumbnailOf = (fileName: string): string => {
    if (fileName.includes('thumb-')) return fileName
    return `thumb-${fileName}`
}

export const savePhoto = async (photo: UploadedFile) => {
    try {
        const photoPath = fullPath(photo.name)
        if(!doesExist(photo.name)) await photo.mv(photoPath);
        if(!doesExist(thumbnailOf(photo.name))) await resizer(photo.name)
        return await jsonfiyPhoto(photo.name)
    } catch (err) {
        console.log('error')
    }
}

export default {
    allPhotos,
    allThumbnails,
    fullPath,
    doesExist,
    sizeOf,
    thumbnailOf,
    savePhoto
}