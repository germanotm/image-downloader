/**
 * A javascript library for download image files in desired format (content type).
 * https://github.com/germanotm/image-downloader
 */
ImageDownloader = class {

  constructor(url, filename, format) {
    this.url = url
    this.filename = filename
    this.format = format
  }

  execute() {
    return this.getImage().
    then(img => this.download(img))
  }

  getImage() {
    return this.getBlob(this.url)
    .then(blob => {
      if(blob.type == this.format) {
        return this.blob2Image(blob)   
      } else {
        return this.blob2Image(blob)
        .then(image => this.image2Canvas(image))
        .then(canvas => this.canvas2Image(canvas))
      }
    }) 
  }

  getBlob(url) {
    return fetch(url)
    .then(res => res.blob())
  }

  download(img) {
    this.getBlob(img.src)
    .then(blob => {
      return new Promise((resolve,reject) => {
        let link = document.createElement('a')
        link.download=this.filename
        link.href=URL.createObjectURL(blob)
        link.click()
        resolve()
      })
    })
    
  }

  canvas2Image(canvas) {
    return new Promise((resolve,reject) => {
      let img = new Image()
      img.src = canvas.toDataURL(this.format)
      resolve(img)
    })
  }

  image2Canvas(image) {
    return new Promise(function(resolve,reject) {
      let canvas = document.createElement("canvas")
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0)
      resolve(canvas)
    })
  }

  blob2Image(blob) {
    return new Promise(function(resolve,reject) {
      let img = new Image()
      img.crossOrigin = "Anonymous"

      img.onload = function() {
        return resolve(img)
      }
      img.onerror = function() {
        throw new Error('Image load error')
      }

      img.src = URL.createObjectURL(blob)
    })
  }
}