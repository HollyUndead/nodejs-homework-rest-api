const {HttpError} =require('../helpers/index')

const isBodyEmpty = async (req, res, next)=>{
    if(!Object.keys(req.body).length){
        next(HttpError(400, 'missing fileds'))
    }
    next()
}

module.exports = isBodyEmpty