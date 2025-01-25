const asyncHandler = require("express-async-handler");
let bcrypt = require('bcrypt');
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(400);
        throw new Error("user not found")
    }



})
const Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user.password)
    if (isPassword) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.emails
        });
    }


})

module.exports = { registerUser, Login };