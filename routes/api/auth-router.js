const express = require('express')
const {createUser, signup, logoutUser, uploadAvatar} = require('../../controller/users-controller');
const {userSchemaJoi} = require('../../schema/schemaJOI')
const { validateBody, isBodyEmpty, upload } = require('../../middlewares');

const router = express.Router();


router.post('/register', isBodyEmpty, validateBody(userSchemaJoi), createUser)

router.get('/login', isBodyEmpty, validateBody(userSchemaJoi), signup)

router.delete('/logout', logoutUser)

router.patch('/avatars', upload.single('avatar'), uploadAvatar)

module.exports = router