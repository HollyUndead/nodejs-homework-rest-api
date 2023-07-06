const { HttpError } = require('../helpers');
const User = require('../models/user-schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env

const createUser = async  (req, res, next) =>{
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    try{
        const {email} = req.body
        const userByEmail = await User.findOne({email})
        if(userByEmail !== null){
            throw HttpError(409, 'Email in use')
        }
        const user = await User.create({...req.body, password: passwordHash})
        res.status(201).json({email: user.email, subscription: user.subscription})
    }
    catch (error) {
        const { status = 500, message = "Server errror" } = error;
        res.status(status).json({ message });
    }    
}
    
const signup = async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        throw HttpError(401, 'Email or password is wrong')
    }
    const compareResult = await bcrypt.compare(req.body.password, user.password)
    if(!compareResult){
        throw HttpError(401, 'Email or password is wrong')
    }
    const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '23h'})
    user.token = token
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true})
    res.json({token, user:{email: updatedUser.email, subscription: updatedUser.subscription}})
}

const logoutUser = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    const user = await User.findOne({token})
    if(!user){
        throw HttpError(401, 'Not authorized')
    }
    user.token = ''
    console.log(user);
    await User.findOneAndUpdate({id: user.id})
    res.status(204).json()
}


module.exports = {
    createUser,
    signup,
    logoutUser
}