const {isValidObjectId} = require('mongoose')

const {HttpError} = require('../helpers/index')

const isValidId = (req, res, next)=>{
    const id = req.params.contactId
    if(!isValidObjectId(id)){
        next(HttpError(404, `${id} not valid id format`))
    }
    next()
}

module.exports = isValidId