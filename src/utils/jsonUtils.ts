//this file is creating json that contains metadata and links to files on server.
import sharp, { Metadata } from "sharp";
import g from "./globals";
import fm from "./file-manager";

const serverURL = "http://127.0.0.1:5000";

export const jsonfiyPhoto = async (fileName: string) => {
   return {
      name: fileName,
      filesize: fm.sizeOf(fileName),
      sizeUnit: "MB",
      photo_link: `${serverURL}${g.servingPhotosURL}${fileName}`,
      thumbnail_link: `${serverURL}${g.servingThumbnailsURL}thumb-${fileName}`,
      metadata: await extractMetadata(fileName),
   };
};

export const jsonfiyThumbnail = async (fileName: string) => {
   return {
      name: fileName,
      filesize: fm.sizeOf(fileName),
      sizeUnit: "MB",
      thumbnail_link: `${serverURL}${g.servingThumbnailsURL}${fileName}`,
      metadata: await extractMetadata(fileName),
   };
};

const extractMetadata = async (fileName: string): Promise<any> => {
   const image = sharp(fm.fullPath(fileName));
   const data: Metadata = await image.metadata();
   return {
      format: data.format,
      width: data.width,
      height: data.height,
      channels: data.channels,
      density: data.density,
      depth: data.depth,
   };
};

export const jsonfiyError = (fileName: string): {} => {
   return {
      status: false,
      message: "File Not Found",
      requestedFile: `${fileName}`,
      hint: "Make sure to include the file extension or check the file name",
   };
};
