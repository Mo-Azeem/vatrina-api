import express, { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fm from "../../utils/file-manager";
import { jsonfiyPhoto, jsonfiyError } from "../../utils/jsonUtils";

const photos = express.Router();

// Fetch all Photos
photos.get("/", async (req: Request, res: Response) => res.send(await fm.allPhotos()));

// Fetch One Single Photo Using The File's Name
photos.get("/:fileName", async (req: Request, res: Response): Promise<void> => {
   if (!fm.doesExist(req.params.fileName)){
      res.status(404).send(jsonfiyError(req.params.fileName));
      return 
   }
   res.send(await jsonfiyPhoto(req.params.fileName));
});

// Upload a Photo and Create a Thumbnail for it, then return a JSON with Photo's and Thumb's Links
photos.post("/", async (req: Request, res: Response):Promise<void> => {
   try {
      if (!req.files) {
         res.status(400).send({
            status: false,
            message: "No File was Uploaded",
         });
      } else {
         res.send(await fm.savePhoto(req.files.photo as UploadedFile));
      }
   } catch (err) {
      res.status(500).send(err);
   }
});

export default photos;
