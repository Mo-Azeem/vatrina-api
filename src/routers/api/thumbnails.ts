import express from "express";
import fm from "../../utils/file-manager";

const thumbnails = express.Router();

thumbnails.get("/", async (req, res) => {
   const allThumbnails = await fm.allThumbnails();
   return res.send(allThumbnails);
});

export default thumbnails;
