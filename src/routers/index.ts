import express from "express";
import photos from "./api/photos";
import thumbnails from "./api/thumbnails";

const routes = express.Router();

routes.use("/photos", photos);
routes.use("/thumbnails", thumbnails);

export default routes;
