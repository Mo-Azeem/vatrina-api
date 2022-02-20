import express, { Request, Response } from "express";
import fm from "../../utils/file-manager";

const thumbnails = express.Router();

thumbnails.get("/", async (req: Request, res: Response): Promise<void> => {
   const allThumbnails = await fm.allThumbnails();
   res.send(allThumbnails);
});

export default thumbnails;
