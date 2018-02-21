# Image Downloader
A javascript library for download image files in desired format (content type).

I needed this code to allow users to download image files on google storage in different formats. I wanted some way to convert the images without have to go through application server. So i use HTML5 canvas to convert the image on browser.

Only tested on chrome.

To use this:
```html
<script src="image-downloader.js"></script>
```

Here are some examples on how to use it :
```javascript
//Image url
let url = "https://i.imgur.com/rpuqUn0.png"

// Download as JPG
let download = new ImageDownloader(url,"image.jpg","image/jpeg")
download.execute()

// Download as PNG
let download = new ImageDownloader(url,"image.png","image/png")
download.execute()

//Avoid multiple downloads
let downloadInProgress = false
if(downloadInProgress) {
  alert("download in progress")
} else {
  let download = new ImageDownloader(url,"image.jpg","image/jpeg")
  downloadInProgress = true
  download.execute().then(() => 
    downloadInProgress = false
  )
}
```

## License  
"THE BEER-WARE LICENSE" (Revision 42): As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
