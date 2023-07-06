const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const User = require('../models/user-schema');

const {SECRET_KEY} = process.env;

const authentificate = async (req,res, next) => {
    const {authorization} = req.headers
    const checkString = authorization.split(' ')
    if(checkString[0] !== "Bearer"){
        next(HttpError(401, 'Not authorized'))
    }
    try{
        const {id} = jwt.verify(checkString[1], SECRET_KEY)
        const user = await User.findById(id)
        console.log(user);
        if(!user){
            next(HttpError(404))
        }
        req.user = user
    }catch{
        next(HttpError(401, 'Not authorized'))
    }
    next()
}

module.exports = authentificate