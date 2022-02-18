import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routers'
import globals from './utils/globals'

const app = express()
const port = process.env.PORT || 5000;

//applying middlewares
app.use(cors())
app.use(fileUpload({createParentPath: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//using routes
app.use('/api', routes)

//serving files 
app.use(globals.servingPhotosURL,express.static(globals.originalPhotosPath))
app.use(globals.servingThumbnailsURL,express.static(globals.thumbnailPhotosPath))

app.listen(port, () => {
    console.log('now serving on loacalhost:' + port);
})

export default app