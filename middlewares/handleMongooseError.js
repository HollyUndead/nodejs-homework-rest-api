const handleMongooseError = (error, data, next)=> {
    const {code, name} = error
    error.status = (name === 'MongoServerError' && code === 11000) ? 109 : 400;
    next();
}

module.exports = handleMongooseError;