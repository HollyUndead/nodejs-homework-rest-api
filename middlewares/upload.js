const multer = require('multer')
const path = require('path')
const { HttpError } = require('../helpers')

const destination = path.resolve('temp')

const storage = multer.diskStorage({
    destination,
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const newFilename = `${uniqueSuffix}_${file.originalname}`
        cb(null, newFilename)
    }
})

const limits = {
    filesize: 250 * 250
}

const mimetypeWhitelist = ['image/jpeg', 'image/png']

const fileFilters = (req,file,cb)=>{
    if(!mimetypeWhitelist.includes(file.mimetype)){
        return cb(HttpError(400, 'Invalid file format'))
    }
}

const upload = multer({
    storage,
})

module.exports = {upload, limits, fileFilters}