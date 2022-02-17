import sharp from 'sharp'
import { thumbnailOf, fullPath } from '../../utils/file-manager'
import resizer from '../../utils/resizer'
import fs from 'fs'

/*
    the delaying between creating and deleteing files is essential, 
    Enough time for the OS to unlock the usage of files.
    PS. I lost brain cells trying to figure it out
*/

const delay = (ms: number | undefined)  => new Promise(resolve => setTimeout(resolve, ms))

beforeAll(async () => {
    //Create a test photo
    const image = sharp({
        create: {
            width: 1920,
            height: 1080,
            channels: 4,
            background: { r: 255, g: 0, b: 0, alpha: 0.5 }
        }
    });
    await image.toFile(fullPath('test_photo.png'));
    await delay(1500)
})

it('Should create a scaled down photo and then move it to the thumbnail directory', async () => {
    await resizer('test_photo.png')
    await delay(1500)
    expect(fs.existsSync(fullPath(thumbnailOf('test_photo.png')))).toEqual(true)
})

afterAll(async () => {
    //delete the test photo files

    fs.unlinkSync(fullPath('test_photo.png'))
    await delay(1500)
    fs.unlinkSync(fullPath(thumbnailOf('test_photo.png')))

})