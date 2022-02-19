# Vatrina.api

![](C:\Users\zema_\Desktop\vatrina.api logo.png)

### Intro

Vatrina.api is a bite-sized image hosting server written in Express, which stores images as files on the server's disk, and produce thumbnails from uploaded images upon receiving. When uploading is done, the app sends JSON back with all needed info like metadata, photo's link, photo's thumbnail link, and more. 



### Getting Started

To get the server up and running, open up a terminal and make sure the current working directory is the root of the Vatrina.api folder, then install all the dependencies by typing: 

```
npm install
```

and then type the next command to start the server

```
npm start
```

or

```
npm run start
```



## Endpoints

These are endpoints that currently available for you to use.



#### GET /api/photos

To retrieve all available photos.



#### GET /api/photos/id

To retrieve a specific photo, **id** here is the file name with extension, for example:

> http://localhost:5000/api/photos/meme.jpg



#### POST /api/photos

Upload a single photo at a time, bulk uploading isn't available yet.

Make sure to use **Form Data** as the body type and include **photo as Key**, with **a file as Value**

![](C:\Users\zema_\Desktop\Capture.PNG)