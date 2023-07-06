const {HttpError} = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            if(error.details[0].message.split(' ').includes('contain')){
                next(HttpError(400, 'Помилка від Joi або іншої бібліотеки валідації'))
            }
            if(error.details[0].message.split(' ').includes('required')){
                next(HttpError(400, `missing required ${error.details[0].path[0]} field`))
            }
        }
        next();
    }

    return func;
}

module.exports = validateBody;