const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');


module.exports.registerUser = async(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    

    const { fullname, email, password } = req.body;
    //we cannot save password as a plain text in database directly so we would have to convert it into hash text

    const hashedPassword = await userModel.hashPassword(password);
//it will create a user
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    //generating token here for the user that created
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}